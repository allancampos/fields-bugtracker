# Bug Tracker
It is a Bug Tracker API that use nodejs

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
The project only support format JSON file

## Technologies
* express - version 4.17.1
* mongodb - version 3.6.2
* body-parser - version 1.19.0
* bcrypt - version 5.0.0
* nodemailer - version 6.4.16

## Setup
* Heroku/MongoDB setup
* Create your ENV variables: MONGO_URI, EMAIL and PASSWORD 
* Set variables in your environment

### Installation
$ git clone git@github.com:allancampos/fields-bugtracker.git <br/>
$ npm install

Link demo: https://fields-bugtracker.herokuapp.com/

## Features
List of features ready and TODOs for future development
* Add users, projects, issues and comments
* Retrieving all and individual list elements

GET METHODS <br/>
Get all users /users  <br/>
Get an user by email /users/:email <br/>
Get all projects /projects <br/>
Get a single project /projects/:slug <br/>
Get all issues /issues <br/>
Get a issue by issueNumber /issues/:issueNumber <br/>
Get all issues for a project /projects/:issueNumber/issues <br/>
Get all comments for an issue /issues/:issueNumber/comments <br/>
Get a single comment /issues/:issueNumber/comments/:commentId <br/>

POST METHODS <br/>
Insert an user /users <br/>
Insert a project /projects <br/>
Insert a issue for a project /projects/:slugNumber/issues <br/>
Insert a comment /issues/:issueNumber/comments <br/>

## Status
Project is: _in progress_,

## Contact
Created by [AllanCampos]