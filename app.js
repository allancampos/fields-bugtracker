//Using express - Libraries  
const express = require('express');
const app = (module.exports = express());
const bp = require('body-parser');
const users = require('./controllers/users')();
const usersM = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();


//define hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

// Authentication
app.use(async(req,res,next) => {
    const FailedAuthMessage = {
        error: 'Failed',
        message: 'not authorized',
        code: 'xxx'
    }

    const suppliedKey = req.headers['x-api-key'];
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if(!suppliedKey){
        console.log('Failed authentication, no key supplied');
        new Date(), 
        clientIP;
        FailedAuthMessage.code = '01';
        return res.status(401).json(FailedAuthMessage);
    }

    const user = await usersM.getKey(suppliedKey);
    if(!user){
        FailedAuthMessage.code = '02'
        return res.status(401).json(FailedAuthMessage);
    }
    next();
})


app.use(bp.json());

//Routes
app.get('/',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello World');
})

// Routes for Users
app.get('/users', users.getController);
app.get('/users/:email', users.getEmail);
app.post('/users', users.insertController);

// Routes for Projects
app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getSlug);
app.post('/projects', projects.insertController);

//Routes for Issues
app.get('/issues', issues.getController);
app.get('/issues/:issueNumber', issues.getIssue);
app.get('/projects/:issueNumber/issues', issues.getProject);
app.post('/projects/:slugNumber/issues', issues.insertController);

//Routes for Comments
app.get('/issues/:issueNumber/comments', comments.getController);
app.get('/issues/:issueNumber/comments/:id', comments.getCommentController);
app.post('/issues/:issueNumber/comments',comments.updateController);

// Error
app.use((req,res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found '
    });
})

//listen
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})