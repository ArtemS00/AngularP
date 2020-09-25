import { Component } from '@angular/core';
import { FormControl, Validators, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern('^[a-zA-Z0-9]*$')]);
  confirmPassword: FormControl = new FormControl('');
  role: FormControl = new FormControl('', [Validators.required]);

  roles: any[] = [{ role: Role.JobSeeker, desc: "Job Seeker" }, { role: Role.Employer, desc: "Employer" }];
  hidePass = true;
  hideConfirmPass = true;
  buttonDisabled = false;

  constructor(
    private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated())
      router.navigate(['']);

    this.confirmPassword.setValidators([Validators.required, this.matchValues(this.password, this.confirmPassword)]);
    this.form = new FormGroup({ email: this.email, password: this.password, confirmPassword: this.confirmPassword, role: this.role });
  }

  matchValues(control: FormControl, matchTo: FormControl):
    (AbstractControl) => ValidationErrors | null {
    return (): ValidationErrors | null => {
      return control && matchTo && control.value === matchTo.value
        ? null
        : {
          matching: {
            isMatching: false
          }
        };
    };
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('minlength')) {
      return 'Not a valid password. Use 8 or more characters.';
    }
    if (this.password.hasError('maxlength')) {
      return 'Not a valid password. Use 128 or less characters.';
    }

    return this.password.hasError('pattern') ? 'Not a valid password. Allowed characters a-z, A-Z, 0-9.' : '';
  }

  getConfirmPasswordError() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.confirmPassword.hasError('matching') ? 'Passwords didn\'t match' : '';
  }

  getRoleError() {
    return this.role.hasError('required') ? 'You must choose a value' : '';
  }

  register() {
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

    this.authService.register(this.email.value, this.password.value, this.role.value).subscribe(
      result => {
        this.router.navigate(['']);
        this.buttonDisabled = false;
      },
      error => {
        this.buttonDisabled = false;
      });
  }
}
