const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const collection = 'issues';

module.exports = () => {
    
    const get = async (issueNumber = null) => {
        const pipeline = [
            {$match: {"issueNumber": issueNumber}}, 
            {$project: 
                { comments: 1, 
                    _id: 0, 
                    issueNumber: 1
                }
            }
        ]

        const comments = await db.aggregate(collection, pipeline);
        return comments;
    }

    const getComment = async (id) => {
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
        
        const comments = await db.aggregate(collection, pipeline);
        return comments;
    }

    

    const updateComment = async (issueNumber, text, author) => {
        const pipeline = [{issueNumber: issueNumber}, {$push:{comments:{ _id: new ObjectID(), text: text, author: author }}}]
        const results = await db.update(collection,pipeline);

        return results.result;
    }

    return{
        get,
        getComment,
        updateComment
    }
}