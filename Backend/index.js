import express from 'express'
import uploadcontroller from './controller/fileupload.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.port || 3000

app.use(express.json());

app.listen(port, () => {
    console.log("app is listening at port" + port);
})

app.use('', uploadcontroller);