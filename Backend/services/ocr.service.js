import { createWorker } from "tesseract.js"


const performOCR = async (filepath) => {

    const worker = await createWorker()

    try {

        const { data: { text, confidence } } = await worker.recognize(filepath)

        const raw_text = text.split('\n')[0]
        
        return { raw_text, confidence }
    } finally {
        await worker.terminate()
    }
}

export default performOCR