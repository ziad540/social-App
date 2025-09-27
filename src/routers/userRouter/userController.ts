import {Router} from 'express'
import { signInService, signUpService } from './userService';


const router = Router();

router.post('/sing_up', signUpService);
router.post('/sing_in', signInService);


export default router;
