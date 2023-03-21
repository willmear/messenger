import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';


@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private http: HttpClient) {}
  
    login(email: string, password: string): Observable<any> {
      return this.http.post(
        AUTH_API + 'authenticate',
        {
          email,
          password,
        }
      );
    }
  
    register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
      return this.http.post(
        AUTH_API + 'register',
        {
          firstname,
          lastname,
          email,
          password
        },
      );
    }

    public setRoles(roles: string) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }

    public getRoles() {
      return JSON.parse(localStorage.getItem("roles") || '{}');
    }

    public setToken(jwtToken: string) {
      localStorage.setItem("jwtToken", jwtToken);
    }

    public getToken(): string {
      return localStorage.getItem("jwtToken") || '{}';
    }

    public clear() {
      localStorage.clear();
    }

    public isLoggedin() {
      return (this.getRoles() != '{}') && (this.getToken() != '{}');
    }

    public roleMatch(allowedRoles: any): boolean {
      let isMatch = false;
      const userRoles:any = this.getRoles();

      if(userRoles != null && userRoles) {
        if(userRoles == allowedRoles) {
          isMatch = true;
          return isMatch;
        }
      }
      return isMatch;
    }
  }