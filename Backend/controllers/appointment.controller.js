import path from "path"
import OCRpipeline from "../services/pipeline.service.js"

const parseAppointment = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
        const filepath = path.join(req.file.destination, req.file.filename)
        const result = await OCRpipeline(filepath);

        res.status(200).json({ result, status: "ok" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

export default parseAppointment