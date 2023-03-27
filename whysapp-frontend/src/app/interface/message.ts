import { Conversation } from "./conversation"

export interface Message {
    id: number;
    message: String;
    sentAt: Date;
    senderEmail: String;
    conversation_id: number;
}
