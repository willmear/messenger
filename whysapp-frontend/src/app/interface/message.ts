import { Conversation } from "./conversation"

export interface Message {
    message: String;
    sentAt: Date;
    conversation: Conversation;
}
