const projects = require('../models/projects')();

module.exports = () => {
    const getController = async (req, res) =>{
        const { project, error } = await projects.get();

        if (error) {
            res.status(500).json({error,});
        }
        res.json(project);
        
    };

    const getSlug = async (req,res) => {
        const { project, error } = await projects.get(req.params.slug);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(project);
    };
    
    const insertController = async (req,res) => {
        let slug = req.body.slug;
        let name = req.body.name; 
        let description = req.body.description;
        
        const { result, error } = await projects.insert(slug, name, description);
        if (error) {
            res.status(500).json({error,});
        }
        
        res.json(result);
    }

    return{
        getController,
        getSlug,
        insertController
    }
}