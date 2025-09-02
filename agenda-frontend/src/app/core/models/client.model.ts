import { Person } from "./person.model";

export interface Client extends Person {
    dateOfBirth: string;
    comments: string;
}
