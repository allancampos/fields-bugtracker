const db = require('../db')();

const collection = 'projects';

module.exports = () => {
    
    const get = async (slug = null) => {
        if(!slug){

            const projects = await db.get(collection);

            return projects;
        }

        const project = await db.get(collection, {slug});
        return project;
    }

    const insert = async (slug, name, description) => {
        const result = await db.insert(collection, { slug : slug, name: name, description: description });
    }

    return{
        get,
        insert
    }
}