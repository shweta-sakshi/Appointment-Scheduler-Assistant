import preprocessImage from './preprocess.service.js'
import performOCR from './ocr.service.js'
import extractEntities from './nlp.service.js'
import normalizetime from './normalize.service.js'

const OCRpipeline = async (inputPath, text) => {
    
    let extractedData = {
        raw_text: text,
        confidence: 1.0
    }
    if (inputPath !== "") {
        let preprocessedImagePath = await preprocessImage(inputPath)
        extractedData = await performOCR(preprocessedImagePath)
    }
    const extractedEntities = await extractEntities(extractedData)
    const normalizedDateTime = await normalizetime(extractedEntities)

    const result = {
        appointment: {
            department: extractedEntities.entities.department,
            date: normalizedDateTime.normalized.date,
            time: normalizedDateTime.normalized.time,
            tz: normalizedDateTime.normalized.tz
        }
    }

    return result
}

export default OCRpipeline 