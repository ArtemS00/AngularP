import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { AUTH_API_URL } from "../app-injection-tokens";
import { Token } from "../models/token";
import { tap } from 'rxjs/operators';
import { Role } from "../models/role";

export const ACCESS_TOKEN_KEY = 'store_access_token';
export const USER_ROLE = 'store_user_role';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router) {
  }

  login(email: string, password: string):Observable<Token> {

    return this.http.post<Token>(this.apiUrl + "login", { email, password })
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        }));
  }

  register(email: string, password: string, role: Role):Observable<Token> {

    return this.http.post<Token>(this.apiUrl + "register", { email, password, role })
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
          localStorage.setItem(USER_ROLE, Role[token.role]);
        }));
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticatedAs(role : Role): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    let userRole = localStorage.getItem(USER_ROLE);
    return token && !this.jwtHelper.isTokenExpired(token) &&
      userRole && userRole == role.toString();
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}
