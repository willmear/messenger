import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Conversation } from '../interface/conversation';
import { ConversationService } from '../_service/conversation.service';
import { MessageService } from '../_service/message.service';
import {AuthService} from "../_service/auth.service";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit{
  faMagnifyingGlass = faMagnifyingGlass;
  conversations: Conversation[] = [];
  conversation: any;

  constructor(private messageService: MessageService, private conversationService: ConversationService,
              private authService: AuthService) {  }

  ngOnInit(): void {

    this.conversationService.query().subscribe((res: HttpResponse<Conversation[]>) => this.onConversationSuccess(res.body));

    // this.conversationService.create({sender: 'Will', recipient: 'Maddy', messages: []}).subscribe(res => {
    //   console.log(res);
    // })
  }

  onConversationSuccess(conversations: Conversation[] | null): void {
    this.conversations = conversations?.filter((convo) => convo.sender == this.authService.getEmail()) || [];
    this.conversations.forEach(e => this.addConversation(e));
  }

  addConversation(conversation: Conversation):void {
    this.conversation.addConversation({
      sender: conversation.sender,
      recipient: conversation.recipient,
      messages: conversation.messages
    })
  }

}
