const db = require('../db')();

const collection = 'projects';

module.exports = () => {
    
    const get = async (slug = null) => {
        try{
            if(!slug){

                const project  = await db.get(collection);
    
                return {project };
            }
    
            const project = await db.get(collection, {slug});
            return {project};
        }catch(err){
            return {
                error: err,
            };
        }
    }

    const insert = async (slug, name, description) => {
        if(!slug || !name || !description) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const slugName = await db.get(COLLECTION, {
                slug: slug,
            });
            if (slugName.length > 0) {
                return {
                    result: 'This project exists',
                };
            }
            const result = await db.insert(collection, { slug : slug, name: name, description: description });
            return {result};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    return{
        get,
        insert
    }
}