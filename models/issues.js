const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;


const collection = 'issues';

module.exports = () => {
    
    const get = async (issueNumber = null) => {
        try{
            if(!issueNumber){

                const issues = await db.get(collection);
    
                return {issues};
            }
    
            const issue = await db.get(collection, {issueNumber});
            return {issue};
        }catch(err){
            return {
                error: err,
            }
        }
    }

    const insert = async (issueNumber, title, description, status, project_id) => {
        if(!slugName || !title || !description || !status) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const count = await db.ndocs(collection);
            const results = await db.insert(collection, { issueNumber : `${issueNumber}-${count + 1}`, title: title, description: description,
            status: status, project_id: new ObjectID(project_id), comments: [] });
            return {results};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    const getProject = async (issueNumber) => {
        try{

        
        let exp = new RegExp(issueNumber);
        const project = await db.get(collection, {issueNumber: exp});
        return {project};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    const status = async (issueCount, status) => {
        if(!issueCount || !status) {
            return {
                error: 'fill in all fields',
            };
        }
        
        const pipeline = [
            { issueCount: issueCount },
            { $set: { status: status } },
        ];
        try {
            const results = await db.update(collection, pipelinee);
            return {results};
        } catch (err) {
            return {
                error: err,
            };
        }
    };
    
    return{
        get,
        insert,
        getProject,
        status
    }
}