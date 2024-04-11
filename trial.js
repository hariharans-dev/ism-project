const express = require('express');
const app = express();

// Sample data
const data = [
    {
        "id": 25,
        "temperature": 25,
        "humidity": 40,
        "pressure": 1013,
        "createdAt": "2024-03-25T15:21:58.000Z"
    },
    {
        "id": 24,
        "temperature": 25,
        "humidity": 45,
        "pressure": 1013,
        "createdAt": "2024-03-25T15:19:19.000Z"
    },
    // Add more data here if needed
];

// Route to send the data
app.get('/data', (req, res) => {
    res.json(data);
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
