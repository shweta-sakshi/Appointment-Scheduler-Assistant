import express from 'express'
import dotenv from 'dotenv'
import appointmentRouter from './api/routes/appointments.routes.js'
import globalErrorHandler from './controllers/error.controller.js';
import AppError from './utils/appError.js';

dotenv.config()

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(express.text())

app.use('/v1/appointment', appointmentRouter)

app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log("app is listening at port" + port)
})