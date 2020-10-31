const issues = require('../models/issues')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await issues.get());
    };

    const getIssue = async (req,res) => {
        res.json(await issues.get(req.params.issueNumber));
    };
    
    const insertController = async (req,res) => {

        let slugNumber = req.params.slugNumber;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        const result = await issues.insert(slugNumber, title, description, status, project_id);
        res.json(result);
    }

    const getProject = async (req,res) => {
        res.json(await issues.getProject(req.params.issueNumber));
    };

    return{
        getController,
        getIssue,
        insertController,
        getProject
    }
}