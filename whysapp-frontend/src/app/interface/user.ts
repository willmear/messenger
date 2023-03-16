import { UserRoles } from "../enum/UserRoles.enum";

export interface User {
    id: number;
    username: String;
    password: String;
    email: String;
    role: UserRoles;
}

export type NewUser = Omit<User, 'id'> & { id: null };