//Using express 
const express = require('express');
const app = (module.exports = express());
const bp = require('body-parser');
const users = require('./controllers/users')();

//define hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(bp.json());

//Routes
app.get('/',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello World');
})

app.get('/users', users.getController);
app.get('/users/:email', users.getEmail);
app.post('/users', users.insertController);
//listen
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})