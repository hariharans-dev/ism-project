const crypto = require('crypto');

// Function to generate RSA key pair
function generateRSAKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

// Function to sign a packet using RSA private key
function signPacket(packet, privateKey) {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(packet);
    return sign.sign(privateKey, 'base64');
}

// Function to verify the signature and retrieve the original data
function verifyAndRetrieveData(packet, signature, publicKey) {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(packet);
    const isValid = verify.verify(publicKey, signature, 'base64');
    const data = isValid ? packet : null;
    return { isValid, data };
}

// Example usage
const { privateKey, publicKey } = generateRSAKeyPair();
const packet = 'This is the packet to be signed';

// Sign the packet
const signature = signPacket(packet, privateKey);
console.log('Signature:', signature);

// Verify the signature and retrieve the original data
const { isValid, data } = verifyAndRetrieveData(packet, signature, publicKey);
console.log('Signature verification:', isValid);
console.log('Original data:', data);
