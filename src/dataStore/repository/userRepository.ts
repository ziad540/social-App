import {BaseRepository} from "./baseRepositorry";
import {User} from "../../types";
import {userModel} from '../collections/userCollection'
import {Model} from "mongoose";

export class UserRepository extends BaseRepository<User> {
    constructor(protected _userModel: Model<User>) {
        super(userModel);
    }
}