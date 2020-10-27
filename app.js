const express = require('express');
const app = express();

const port = 3000;

app.get('/',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello World');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})