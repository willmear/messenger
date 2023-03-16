import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'any'

  constructor(private http: HttpClient) {



   }
}
