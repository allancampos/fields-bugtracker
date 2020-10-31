const comments = require('../models/comments')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await comments.get(req.params.issueNumber));
    };

    const getCommentController = async (req,res) => {
        res.json(await comments.getComment(req.params.id));
    };
    
    const updateController = async (req,res) => {
        let issueNumber = req.params.issueNumber;
        let text = req.body.text;
        let author = req.body.author;

        const result = await comments.updateComment(issueNumber, text, author);
        res.json(result);
    }

    return{
        getController,
        getCommentController,
        updateController
    }
}