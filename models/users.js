const db = require('../db')();

const collection = 'users';

module.exports = () => {
    
    const get = async (email = null) => {
        if(!email){

            const users = await db.get(collection);

            return users;
        }

        const user = await db.get(collection, {email});
        return user;
    }

    const insert = async (name, email, usertype, key) => {
        const result = await db.insert(collection, { name : name, email: email, usertype: usertype , key: key });
    }

    return{
        get,
        insert
    }
}