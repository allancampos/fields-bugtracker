//Using express 
const express = require('express');
const app = express();

//define hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello World');
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})