import {Document} from "mongoose";
import {genderEnum} from './common/enums';
export interface User extends Document {
    DOB: Date;
    age: number;
    email: string;
    firstName: string;
    gender: genderEnum;
    lastName: string;
    password: string;
    phoneNumber: string;
}

export interface Post {
}

export interface Comment {
}

export interface Like {
}
