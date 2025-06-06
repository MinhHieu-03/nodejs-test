const express = require('express');
const app = express();

// Tạo route mặc định
app.get('/', (req, res) => {
    res.send('Hello Node.js + Express!');
});

// Chạy server tại cổng 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});