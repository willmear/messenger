import { User } from "./user";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    DeveloperMessage: string;
    data: { users?: User[], user?: User };
}