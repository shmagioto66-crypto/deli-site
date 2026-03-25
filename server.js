const express = require('express');
const path = require('path');

const app = express();

// static files
app.use(express.static('public'));

// მთავარი გვერდი
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static('data/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'public', 'index.html'));
});

