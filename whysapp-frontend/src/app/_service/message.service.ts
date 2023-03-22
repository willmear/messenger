import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interface/message';

export type EntityResponseType = HttpResponse<Message>;
export type EntityArrayResponseType = HttpResponse<Message[]>;

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const requestOptions = {                                                                                                                                                                                 
  headers: new Headers(headerDict), 
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  protected resourceUrl = 'http://localhost:8081/api/v1/message'

  constructor(protected http: HttpClient) { }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<Message[]>(`${this.resourceUrl}/messages`, { observe: 'response'});
  }

  create(message: Message): Observable<EntityResponseType> {
    return this.http.post<Message>(`${this.resourceUrl}`, message, { observe: 'response' });
  }
}
