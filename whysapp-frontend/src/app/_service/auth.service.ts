import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
  }