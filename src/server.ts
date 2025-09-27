import express from 'express'
import 'dotenv/config'
import {dbConnection} from "./dataStore/mongoDb/db.connection";
import userRouter from './routers/userRouter/userController'

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);

app.listen(3001, async () => {
    await dbConnection();
    console.log("Listening on port 3000");
})