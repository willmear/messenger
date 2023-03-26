import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass,faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Conversation } from '../interface/conversation';
import { Message } from '../interface/message';
import { ConversationService } from '../_service/conversation.service';
import { MessageService } from '../_service/message.service';
import { AuthService } from "../_service/auth.service";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit{
  faMagnifyingGlass = faMagnifyingGlass;
  faPaperPlane = faPaperPlane;
  faPlus = faPlus;
  errorMessage = '';
  conversations: Conversation[] = [];
  conversation: any;
  conversationForm: any = {
    recipient: null
  };

  constructor(private messageService: MessageService, private conversationService: ConversationService,
              private authService: AuthService) {  }

  ngOnInit(): void {

    // TODO: needs to add get id too.
    this.conversationService.query().subscribe((res: HttpResponse<Conversation[]>) => this.onConversationSuccess(res.body));

    // this.conversationService.create({sender: 'Will', recipient: 'Maddy', messages: []}).subscribe(res => {
    //   console.log(res);
    // })
  }

  onConversationSuccess(conversations: Conversation[] | null): void {
    this.conversations = conversations?.filter((convo) => (convo.sender || convo.recipient) == this.authService.getEmail()) || [];
    this.conversations.forEach(e => this.addConversation(e));
  }

  addConversation(conversation: Conversation):void {
    this.conversation.addConversation({
      sender: conversation.sender,
      recipient: conversation.recipient,
      messages: conversation.messages
    })
  }

  onConversationSubmit(): void {
    let sender = this.authService.getEmail();
    let messages: Message[] = []; 
    const {recipient} = this.conversationForm;
    const newConvo: Conversation = {sender, recipient, messages};

    this.conversationService.create(newConvo).subscribe({next: data =>{
      console.log(data);
    },
    error: err => {
      this.errorMessage = err.error.message;
    }
  });
  }

  onClickConversation(): void {

  }

}
