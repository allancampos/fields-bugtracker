const users = require('../models/users')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await users.get());
    };

    const getEmail = async (req,res) => {
        res.json(await users.get(req.params.name));
    };
    
    const insertController = async (req,res) => {
        let name = req.body.name;
        let email = req.body.email;
        let usertype = req.body.usertype;
        let key = req.body.key;

        const result = await users.insert(name, email, usertype, key);
        res.json(result);
    }

    return{
        getController,
        getEmail,
        insertController
    }
}