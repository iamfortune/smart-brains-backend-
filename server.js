const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kaycodev', 
    password : 'kaycodev20',
    database : 'smart-brain'
  },
});

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sarah',
      email: 'sarah@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]  
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send('it is working!') }) 
// Get users

app.post('/signin', signin.handleSignin(db, bcrypt));
// user sign in 

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// new users register 

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })  
// Get a user profile and id 

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
// Calls and runs entries for the images

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
// Call to clarifai

app.post 
app.listen(process.env.PORT || 4000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

// just doign this
