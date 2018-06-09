const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex')

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'Comp',
        password : 'smbo0396',
        database : 'smart-brain'
    }
});


const app = express();


app.use(bodyParser.json());
app.use(cors());



app.post('/signin', signIn.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleAPICall);


bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

//Load hash from your password DB.


app.listen(3000, ()=>{
    console.log("app is now running on port 3000");
});
