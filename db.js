const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = {useUnifiedTopology: true, useNewUrlParser: true};
const DB_NAME = 'fields-bug-tracker';

module.exports = () => {
    const get = (collection, query = {}) => {
        return new Promise((resolve,reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                
                const db = client.db(DB_NAME);
                const coll = db.collection(collection);

                coll.find(query).toArray((err,documents) => {
                    
                    resolve(documents);
                    client.close();
                })
            });

        })
    }

    const insert = (collection, n) => {
        return new Promise((resolve,reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                
                const db = client.db(DB_NAME);
                const coll = db.collection(collection);

                coll.insertOne(n , (err, result) => {
                    resolve(result);
                    client.close();
                })
            });

        })
    }

    return {
        get,
        insert
    };
}