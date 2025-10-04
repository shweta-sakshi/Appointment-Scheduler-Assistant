import express from 'express'
import dotenv from 'dotenv'
import appointmentRouter from './api/routes/appointments.routes.js'
dotenv.config()

const app = express()
const port = process.env.port || 3000

app.use(express.json())

app.listen(port, () => {
    console.log("app is listening at port" + port)
})

app.use('/v1/appointment', appointmentRouter)