import { Message } from "./message"

export interface Conversation {
    sender: String | null;
    recipient: String;
    messages: Message[];
}


