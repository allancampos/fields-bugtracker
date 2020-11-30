const db = require('../db')();
const collection = 'users';
const nodemailer = require("nodemailer");
const dpEmail = process.env.EMAIL;
const dpPassword = process.env.PASSWORD;
const bcrypt = require('bcrypt');
const salt = 10;

console.log(dpPassword);
console.log(dpEmail);
module.exports = () => {
    // get user
    const get = async (email = null) => {
        
        try{
            if(!email){

                const user = await db.get(collection);

                return {user};
            }

            const user = await db.get(collection, {email: email});
            return { user };

        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    };
    
    const insert = async (name, email, usertype, key) => {


        if(!name || !email || !usertype || !key) {
            return {
                error: 'fill in all fields',
            };
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
              user: dpEmail, 
              pass: dpPassword, 
            },
            tls: {
                rejectUnauthorized: false,
            }   
          });
        
          // Send an email
          let info = await transporter.sendMail({
            from: '"CBWA project" <cct2020076@gmail.com>', // address
            to:  "allanbscs@gmail.com" , 
            subject: "Hello", 
            text: "Welcome", 
            html: "<b><h3>Welcome to fields bug tracker</h3></b>", 
          });
        
          console.log("Message sent: %s", info.messageId);

        try{
            const user = await db.get(collection, { email, });

            if(user.length > 0) {
                return {
                    results: 'This User exists',
                };
            }
            const hashedKey = bcrypt.hashSync(key, salt);
            const result = await db.insert(collection, { name  , email , usertype  , key: hashedKey  });
            return {result};
        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    }
    // get key
    const getKey = async (key,email) => {
        if (!key || !email) {
            return {
                error: 'Missing key or email',
            };
        }
        try{
            const users = await db.get(collection, {email: email});
            const check = bcrypt.compareSync(supliedkey, users[0].key);
            if (!check) {
                return {
                    error: 'ERROR password',
                };
            }

            return users[0];
        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    }
    return{
        get,
        insert,
        getKey
    }
}