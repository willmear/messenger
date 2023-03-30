import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass,faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Conversation, IConversation } from '../interface/conversation';
import { IMessage, Message } from '../interface/message';
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
  conversationsRecipient: IConversation[];
  conversation: any;
  conversationForm: any = {
    recipient: null
  };
  messages: Message[]
  message: any;
  messageForm: any = {
    newMessage: null
  };

  constructor(private messageService: MessageService, private conversationService: ConversationService,
              protected authService: AuthService) { 

                this.conversations = [];
                this.messages = [];
                this.conversationsRecipient = [];
               }

  ngOnInit(): void {


    this.conversationService.query().subscribe((res: HttpResponse<IConversation[]>) => this.onConversationSuccess(res.body));

  }

  onConversationSuccess(conversations: IConversation[] | null): void {
    // this.conversationsRecipient = conversations?.filter((convo) => (convo.recipient) == this.authService.getEmail()) || [];
    // Might only be getting where convo.sender == getEmail()
    this.conversations = conversations?.filter((convo) => convo.sender == this.authService.getEmail() || convo.recipient == this.authService.getEmail()) || [];
    // this.conversations.concat(this.conversations, this.conversationsRecipient);
    // console.log(this.conversationsRecipient);
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
      this.ngOnInit();
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

  openConversation(conversation?: IConversation, convoId?: number): void {
    

    if(convoId) {
      this.conversationService.findMessages(convoId).subscribe((res: HttpResponse<Message[]>) =>
     this.onOpenConversationSuccess(res.body))
    } else if(conversation) {
      // Might have to clear old messages first???
    let id = conversation.id;
    // This is for sending a new message
    this.conversationService.setCurrentConversation(String(id));
    this.conversationService.findMessages(conversation.id).subscribe((res: HttpResponse<Message[]>) =>
     this.onOpenConversationSuccess(res.body))
    }

    
  }

  onMessageSubmit(): void {
    let convoId = this.conversationService.getCurrentConversation();
    let senderEmail = this.authService.getEmail();
    let email: string;

    if (senderEmail != null) {
      email = senderEmail.toString();
    } else {
      email = '';
    }

    const currentDate = new Date();
    const {newMessage} = this.messageForm;
    const messageString: string = newMessage as string
    console.log(messageString);

    this.conversationService.createMessage({message: newMessage, sentAt: currentDate, senderEmail: email, conversation: {id: convoId}}).subscribe({next: data => {
      console.log(data);
      this.openConversation(undefined, convoId);
    },
    error: err => {
      this.errorMessage = err.error.message;
    }
  });
  }

}
