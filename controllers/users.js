const users = require('../models/users')();

module.exports = () => {
    const getController = async (req, res) =>{
        const {user,error} = await users.get();
        if(error){
            res.status(500).json({error,});
        }
        res.json(user);
    };

    const getEmail = async (req,res) => {
        const { user, error } = await users.get(req.params.name);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(user);
    };
    
    const insertController = async (req,res) => {
        console.log(req.body)
        let {name, email, usertype, key } = req.body;
     

        const { result, error } = await users.insert(name, email, usertype, key);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(result);
    }

    return{
        getController,
        getEmail,
        insertController
    }
}