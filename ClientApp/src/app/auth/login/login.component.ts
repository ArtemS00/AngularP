import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string;

  constructor(
    private authService: AuthService, private router: Router)
  {
    if (authService.isAuthenticated())
      router.navigate(['']);
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      result => {
        this.router.navigate(['']);
      },
      error => {
        if (error.status == 401)
          this.errorMessage = "Incorrect login or password!";
        else
          this.errorMessage = "Something wrong! Try later..."
      });
  }
}
