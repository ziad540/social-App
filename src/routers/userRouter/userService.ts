import {Request, Response} from 'express'
import {User} from "../../types";
import {UserRepository} from "../../dataStore/repository/userRepository";
import {userModel} from "../../dataStore/collections/userCollection";
import EmailEventService from '../../utils/sendEmailService';
import { comparePassword, hashingValue } from '../../utils/hashingService';

const userRepo = new UserRepository(userModel);

function calcAge(dob: Date): number {
    const d = new Date(dob);
    const diff = Date.now() - d.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
}

export const signUpService = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, phoneNumber, gender, DOB} = req.body as Partial<User> & {password: string};
        if (!firstName || !lastName || !email || !password || !phoneNumber || !gender || !DOB) {
            return res.status(400).json({ error: "please fill all required fields" });
        }

        const existing = await userRepo.findOneDocument({ email } as any);
        if (existing) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashed = await hashingValue(password);

        
        const newUser = await userRepo.createNewDocument({
            firstName,
            lastName,
            email,
            password: hashed,
            phoneNumber,
            gender,
            DOB: new Date(DOB as any),
            age: calcAge(new Date(DOB as any)),
            roles: ['user']
        } as unknown as User);

        EmailEventService.emit("confirmationEmail", email, "Confirm Email From socialApp")

        return res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const signInService = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body as {email: string, password: string};
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

        const user = await userRepo.findOneDocument({ email } as any);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

       const ok = await comparePassword(password, (user as any).password);
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

        return res.json({ message: 'User signed in' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

