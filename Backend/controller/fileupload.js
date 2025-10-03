import { Router } from "express";
import path from "path";
import upload from '../utils/uploads.js'
import ocrService from "./ocrService.js";
import preprocessImage from "../utils/preprocessImage.js";

const router = Router()

const uploadcontroller = router.post('/upload', upload.single('file'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
        const preprocessedFilePath = await preprocessImage(req.file)
        // const data = await ocrService.performOCR(preprocessedFilePath);
        // res.json({ message: 'File uploaded successfully', filename: req.file.filename, data });
        res.json({ message: "done" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
})

export default uploadcontroller