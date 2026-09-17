const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:\\Users\\PC-TENDER\\.gemini\\antigravity-ide\\brain\\27d48407-601a-4183-b0ad-d24a02c7a380\\.user_uploaded\\media_1789630148581.png';
const outputPath = 'public\\logo.webp';

sharp(inputPath)
  .webp({ quality: 90 })
  .toFile(outputPath)
  .then(() => {
    console.log('Image successfully converted and saved as ' + outputPath);
  })
  .catch(err => {
    console.error('Error converting image:', err);
  });
