import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomResponse } from '../interface/custom-response';
import { User } from '../interface/user';

export type EntityResponseType = HttpResponse<User>;
export type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected resourceUrl = 'any'

  constructor(private http: HttpClient) {}


    find(id: number): Observable<EntityResponseType> {
      return this.http.get<User>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
      return this.http.delete(`${this.resourceUrl}/delete/${id}`, { observe: 'response' });
    }

    create(user: User): Observable<EntityResponseType> {
      return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
    }
  
    

}
