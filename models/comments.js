const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const collection = 'issues';

module.exports = () => {
    
    const get = async (issueNumber = null) => {
        try{
            const pipeline = [
                {$match: {"issueNumber": issueNumber}}, 
                {$project: 
                    { comments: 1, 
                        _id: 0, 
                        issueNumber: 1
                    }
                }
            ];

            const comment = await db.aggregate(collection, pipeline);
            return {comment};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    const getComment = async (id) => {
        
        try{
            const pipeline = [
                {$match: { 
                    'comments._id': ObjectID(id)
                }}, 
                {$project: { 
                    comments: { $filter: 
                    {
                        input: '$comments', 
                        as: 'comment', 
                        cond: {$eq: ['$$comment._id', ObjectID(id)]}
                    }},
                    _id: 0,
                    issueNumber: 1
                }} ]
                
                const comment = await db.aggregate(collection, pipeline);
                return {comment};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    

    const updateComment = async (issueNumber, text, author) => {
        if(!issueNumber || !text || !author ) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const pipeline = [{issueNumber: issueNumber}, {$push:{comments:{ _id: new ObjectID(), text: text, author: author }}}]
            const results = await db.update(collection,pipeline);

            return {results};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    return{
        get,
        getComment,
        updateComment
    }
}