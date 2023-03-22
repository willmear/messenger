import { Message } from "./message"

export interface Conversation {
    sender: String;
    recipient: String;
    messages: Message[];
}


