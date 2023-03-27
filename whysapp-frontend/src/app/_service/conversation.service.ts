import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Conversation, IConversation } from '../interface/conversation';
import { Message } from '../interface/message';
import { AuthService } from './auth.service';

export type EntityResponseType = HttpResponse<Conversation>;
export type EntityArrayResponseType = HttpResponse<IConversation[]>;

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  protected resourceUrl = 'http://localhost:8081/api/v1/conversation'


  constructor(protected http: HttpClient, private authService: AuthService) { }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IConversation[]>(`${this.resourceUrl}/conversations`, {observe: 'response'});
  }

  create(conversation: Conversation): Observable<EntityResponseType> {
    return this.http.post<Conversation>(`${this.resourceUrl}`, conversation, { observe: 'response' });
  }

  // TODO: findById GET request.

  findMessages(id: number): Observable<HttpResponse<Message[]>> {
    return this.http.get<Message[]>(`${this.resourceUrl}/messages/${id}`, {observe: 'response'});
  }

  public setCurrentConversation(conversationId: string) {
    localStorage.setItem('currentConversation', conversationId);
  }

  // hmmm... this doesn't look very safe
  public getCurrentConversation(): number {
    let id: string | null = localStorage.getItem('currentConversation');
    if (id != null) {
      return parseInt(id);
    } else {
      return 0;
    }
  }

}
