const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const keygeneration=(ip)=>{
  console.log("key");
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });
  
  fs.writeFileSync('key/'+ip+'private.pem', privateKey);
  fs.writeFileSync('key/'+ip+'public.pem', publicKey);
}

function keydeletion(ip) {
  const filePathprivate='key/'+ip+'private.pem';
  const filePathpublic='key/'+ip+'public.pem'
  deletefile(filePathprivate)
  deletefile(filePathpublic)
}

function deletefile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file "${filePath}": ${err.message}`);
    } else {
      console.log(`"${filePath}" deleted successfully.`);
    }
  });
}

function createfile(filePath){
  fs.writeFileSync(filePath);
}

module.exports={keygeneration,keydeletion};