import express from 'express'
import 'dotenv/config'
import {dbConnection} from "./dataStore/mongoDb/db.connection";

const app = express();


app.listen(3001, async () => {
    await dbConnection();
    console.log("Listening on port 3000");
})