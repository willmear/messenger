import { Message } from "./message"

export interface IConversation {
    id: number;
    sender: String | null;
    recipient: String;
    messages: Message[];
}

export type Conversation = Omit<IConversation, 'id'>;


