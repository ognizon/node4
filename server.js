const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

//middleware urlencoded
app.use(express.urlencoded({extended: false}));
//middleware json
app.use(express.json());
//middleware static
app.use(express.static(path.join(__dirname, 'public')));

//route handling
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'pages', 'index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'pages', 'aboutus.html'));
});
// All other requests error page
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'pages', '404.html'));
});


// //Error  Handling: custom middleware
// app1.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname,'pages', '404.html'));
// });

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});