import { readSync, writeSync } from 'image-js';
import path from 'path';
import fs from 'fs';

const preprocessImage = async (inputPath) => {
  try {
    // Load the image
    const original_image = readSync(inputPath);
    let processedImage = original_image.grey();
    processedImage = processedImage.gaussianBlur({
      sigma: 0.5,
    });

    //Otsu's Binarization for automatic thresholding
    processedImage = processedImage.threshold({
      algorithm: 'otsu',
    });

    const outputDir = path.join('.', 'uploadedfile');
    const outputPath = path.join(outputDir, `${Date.now()}-processed.png`);

    // Ensure the output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Save the final image
    writeSync(outputPath, processedImage)

    return outputPath;

  } catch (error) {
    console.error("Error during image preprocessing with:", error);
    throw error;
  }
}

export default preprocessImage;