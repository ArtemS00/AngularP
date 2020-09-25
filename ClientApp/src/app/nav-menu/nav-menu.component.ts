import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Role } from '../models/role';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    private authService: AuthService)
  {

  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isLoggedAsEmployer(): boolean {
    return this.authService.isAuthenticatedAs(Role.Employer);
  }

  logout() {
    this.authService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
