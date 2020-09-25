import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);
  form: FormGroup = new FormGroup({ email: this.email, password: this.password });
  hidePass = true;
  buttonDisabled = false;
  errorMessage: string;

  constructor(
    private authService: AuthService, private router: Router)
  {
    if (authService.isAuthenticated())
      router.navigate(['']);
  }

  getEmailError() {
    return this.email.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }


  login() {
    for (let key in this.form.controls) {
      this.form.controls[key].markAsTouched();
      this.form.controls[key].updateValueAndValidity();
    }
    if (!this.form.valid) {
      return;
    }

    if (this.buttonDisabled)
      return;

    this.buttonDisabled = true;

    this.authService.login(this.email.value, this.password.value).subscribe(
      result => {
        this.router.navigate(['']);
      },
      error => {
        this.buttonDisabled = false;
        if (error.status == 401) {
          this.errorMessage = "Incorrect login or password!";
        }
        else {
          this.errorMessage = "Something wrong! Try later..."
        }
      });
  }
}
