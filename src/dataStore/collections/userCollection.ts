import mongoose from 'mongoose'
import {genderEnum} from "../../common/enums";
import {User} from "../../types";

const {Schema} = mongoose;

const userSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true,
        min: [3, 'first name must be at least 3 characters']
    },
    lastName: {
        type: String,
        required: true,
        min: [3, 'last name must be at least 3 characters']
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: [genderEnum.MALE, genderEnum.FEMALE],
        required: true,
    },
    age: {
        type: Number,
        min: [18, 'min age is 18']
    },
    DOB: {
        type: Date,
        required: true,
    },
    roles: {
        type: [String],
        default: ['user']
    }
}, {timestamps: true})

userSchema.index({
    email: 1
}, {unique: true})
userSchema.index({
    phoneNumber: 1
}, {unique: true})

export const userModel = mongoose.model<User>('User', userSchema);
