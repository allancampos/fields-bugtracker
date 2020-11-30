const comments = require('../models/comments')();

module.exports = () => {
    const getController = async (req, res) =>{
        const { comment, error } = await comments.get(req.params.issueNumber);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(comment);
    };

    const getCommentController = async (req,res) => {
        const { comment, error } = await comments.getComment(req.params.id);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(comment);
    };
    
    const updateController = async (req,res) => {
        let issueNumber = req.params.issueNumber;
        let text = req.body.text;
        let author = req.body.author;
        const { results, error } = await comments.updateComment(issueNumber, text, author);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(results);
    }

    return{
        getController,
        getCommentController,
        updateController
    }
}