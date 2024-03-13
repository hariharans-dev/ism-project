const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const PORT = 4000; // Port on which the server will listen

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
    console.log(`Received UDP message from ${remote.address}:${remote.port}:`);
    console.log(message.toString());
    // Handle the received message here as needed
});

server.bind(PORT);
