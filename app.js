const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app1 = express();

//middleware urlencoded
app1.use(express.urlencoded({extended: false}));
//middleware json
app1.use(express.json());
//middleware static
app1.use(express.static(path.join(__dirname, 'public')));

//route handling
app1.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'pages', 'index.html'));
});
app1.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'pages', 'aboutus.html'));
});
//Error  Handling: custom middleware
app1.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,'pages', '404.html'));
});

app1.listen(3001, () => {
    console.log('Server is running on port 3001');
});