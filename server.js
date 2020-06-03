const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

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

app.get('/', (req, res) => {
  res.send(database.users)
}) 

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
    res.json('its working');
  } else {
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
 db('users')
 .returning('*')
 .insert({
  email: email,
  name: name,
  joined: new Date()
 }).then(user => {
    res.json(user[0]);
 })
 .catch(err => res.status(400).json('unable to register!'))
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
 db.select('*').from('users').where({id})
 .then(user => {
   if (user.length) {
      res.json(user[0]);
   } else {
      res.status(400).json('Not found')
   }
 })
 .catch(err => res.status(400).json('error getting user'))
})  


app.put('/image', (req, res) => {
   const { id } = req.body;
   db('users').where('id', '=', id) 
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}) 


app.listen(4000, () => {
    console.log('app is running on port 4000');
});
