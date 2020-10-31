const projects = require('../models/projects')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await projects.get());
    };

    const getSlug = async (req,res) => {
        res.json(await projects.get(req.params.slug));
    };
    
    const insertController = async (req,res) => {
        let slug = req.body.slug;
        let name = req.body.name; 
        let description = req.body.description;
    

        const result = await projects.insert(slug, name, description);
        res.json(result);
    }

    return{
        getController,
        getSlug,
        insertController
    }
}