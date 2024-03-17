const crypto = require('crypto');
const fs = require('fs');

function readfile(pemFilePath) {
    try {
      // 1. Read the file content as a string
      const pemData = fs.readFileSync(pemFilePath, 'utf8');
      return pemData;
    } catch (error) {
      console.error('Error reading PEM file:', error);
      throw error; // Re-throw for proper error handling
    }
  }

const dataToSign = 'This is the data to be signed.';
const key=readfile("key/hariprivate.pem")

console.log(key)