import upload from '../../middleware/uploads.js'
import parseAppointment from '../../controllers/appointment.controller.js'
import Router from 'express'

const router = Router()

router.post('/parse', upload.single('file'), parseAppointment)

export default router