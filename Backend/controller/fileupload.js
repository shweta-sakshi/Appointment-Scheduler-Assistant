import { Router } from "express";
import upload from '../utils/uploads.js'

const router = Router()

const uploadcontroller = router.post('/upload', upload.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    res.json({ message: 'File uploaded successfully', filename: req.file.filename })
})

export default uploadcontroller