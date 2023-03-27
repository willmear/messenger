import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass,faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Conversation, IConversation } from '../interface/conversation';
import { Message } from '../interface/message';
import { ConversationService } from '../_service/conversation.service';
import { MessageService } from '../_service/message.service';
import { AuthService } from "../_service/auth.service";
import { Icon } from '@fortawesome/fontawesome-svg-core';

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
  conversations: IConversation[];
  conversation: any;
  conversationForm: any = {
    recipient: null
  };
  messages: Message[]
  message: any;

  constructor(private messageService: MessageService, private conversationService: ConversationService,
              private authService: AuthService) { 

                this.conversations = [];
                this.messages = [];
               }

  ngOnInit(): void {


    this.conversationService.query().subscribe((res: HttpResponse<IConversation[]>) => this.onConversationSuccess(res.body));

  }

  onConversationSuccess(conversations: IConversation[] | null): void {
    // Might only be getting where convo.sender == getEmail()
    this.conversations = conversations?.filter((convo) => (convo.sender || convo.recipient) == this.authService.getEmail()) || [];
    this.conversations.forEach(e => this.addConversation(e));
  }

  addConversation(conversation: IConversation):void {
    this.conversation.addConversation({
      id: conversation.id,
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

  addMessage(message: Message): void {
    this.message.addMessage({
      id: message.id,
      message: message.message,
      sentAt: message.sentAt,
      senderEmail: message.senderEmail,
      conversationId: message.conversation_id
    });

  }

  onOpenConversationSuccess(messages: Message[] | null): void {
    this.messages = messages || [];
    this.messages.forEach(e => this.addMessage(e));
  }

  openConversation(conversation: IConversation): void {
    // Might have to clear old messages first???
    let id = conversation.id;
    // This is for sending a new message
    this.conversationService.setCurrentConversation(String(id));

    this.conversationService.findMessages(conversation.id).subscribe((res: HttpResponse<Message[]>) =>
     this.onOpenConversationSuccess(res.body))
  }

}
