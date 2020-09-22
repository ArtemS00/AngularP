import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string;

  constructor(
    private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated())
      router.navigate(['']);
  }

  register(email: string, password: string, repeatedPassword: string) {
    if (password != repeatedPassword) {
      this.errorMessage = "Password and repeated password must be equal!";
      return;
    }
    this.authService.register(email, password).subscribe(
      result => {
        this.router.navigate(['']);
      },
      error => {
        if (error.status == 401)
          this.errorMessage = "User with this email already exists!";
        else
          this.errorMessage = "Something wrong! Try later..."
      });
  }
}
