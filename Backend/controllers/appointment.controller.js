import path from "path"
import OCRpipeline from "../services/pipeline.service.js"
import catchAsync from '../utils/catchAsync.js'

const parseAppointment = catchAsync(async (req, res, next) => {
    if (!req.file && !req.body && typeof req.body !== 'string' && req.body.length <= 0) {
        return next(new AppError('Request must include either a text field or an image file.', 400));
    }

    let filepath = ""
    let text = ""

    if (req.body && typeof req.body === 'string' && req.body.length > 0) text = req.body

    if (req.file) filepath = path.join(req.file.destination, req.file.filename)
        
    const result = await OCRpipeline(filepath, text);

    res.status(200).json({ result, status: "ok" });
})

export default parseAppointment