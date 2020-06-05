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

app.get('/', (req, res)=> {res.send(database.users) }) 

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })  

app.put('/image', (req, res) => { image.handleImage(req, res, db) });


app.listen(4000, () => {
    console.log('app is running on port 4000');
});
