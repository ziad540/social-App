import {Request, Response} from 'express'
import {User} from "../../types";

export const singUpService = (req: Request, res: Response) => {
    const {firstName, lastName, email, password, phoneNumber, gender, DOB} = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber || !gender || !DOB) {
        return res.status(400).json({
            error: "please fill all required fields"
        })
    }


    const Newuser:User={
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        DOB,
        // calculate age
        age:18
    }


}