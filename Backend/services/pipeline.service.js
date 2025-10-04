import preprocessImage from './preprocess.service.js'
import performOCR from './ocr.service.js'
import extractEntities from './nlp.service.js'
import normalizetime from './normalize.service.js'


const OCRpipeline = async (inputPath) => {
    const preprocessedImagePath = await preprocessImage(inputPath)

    const extractedData = await performOCR(preprocessedImagePath)
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