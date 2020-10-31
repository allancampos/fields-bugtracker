const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;


const collection = 'issues';

module.exports = () => {
    
    const get = async (issueNumber = null) => {
        if(!issueNumber){

            const issues = await db.get(collection);

            return issues;
        }

        const issue = await db.get(collection, {issueNumber});
        return issue;
    }

    const insert = async (issueNumber, title, description, status, project_id) => {
        const count = await db.ndocs(collection);
        const results = await db.insert(collection, { issueNumber : `${issueNumber}-${count + 1}`, title: title, description: description,
            status: status, project_id: new ObjectID(project_id), comments: [] });
            return results.result
    }

    const getProject = async (issueNumber) => {
        let exp = new RegExp(issueNumber);
        const project = await db.get(collection, {issueNumber: exp});
        return project;

    }
    
    return{
        get,
        insert,
        getProject
    }
}