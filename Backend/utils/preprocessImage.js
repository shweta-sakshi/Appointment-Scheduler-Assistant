import sharp from "sharp"
import path from "path"
import fs from "fs"

const preprocessImage = async (file) => {
    const inputPath = path.join(file.destination, file.filename)
    const outputdir = path.join(file.destination)
    const outputPath = path.join(file.destination, "preprocced-" + file.filename)

    if (!fs.existsSync(outputdir)) {
        fs.mkdirSync(outputdir, { recursive: true })
    }

    await sharp(inputPath)
        .grayscale()
        .normalize()
        .toFile(outputPath)

    return outputPath
}

export default preprocessImage