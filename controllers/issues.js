const issues  = require('../models/issues')();

module.exports = () => {
    const getController = async (req, res) =>{
        const { issue, error} = await issues.get();
        if (error) {
            res.status(500), json({error,});
        }
        res.json(issue);
    };

    const getIssue = async (req,res) => {
        const { issue, error } = await issues.get(req.params.issueNumber);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(issue);
    };
    
    const insertController = async (req,res) => {

        let slugNumber = req.params.slugNumber;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        let {results, error } = await issues.insert(slugNumber, title, description, status, project_id);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(results);
    }

    const getProject = async (req,res) => {
        const { project, error } = await issues.getProject(req.params.issueNumber);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(project);
    };

    const updateStatus = async (req, res) => {
        let {issueCount, status } = req.params;

        const {results, error } = await issues.status(issueCount, status);
        if (error) {
            res.status(500), json({error,});
        }
        res.json(results);
    };

    return{
        getController,
        getIssue,
        insertController,
        getProject,
        updateStatus
    }
}