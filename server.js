const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'kaycodev',
    password: '',
    database: 'smart-brain',
  },
});

knex.select

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  })
  res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if (!found) {
    res.status(400).json('not found ');
  }
})

app.put('/image', (req, res) => {
   const { id } = req.body;
   let found = false;
   database.users.forEach((user) => {
     if (user.id === id) {
       found = true;
       user.entries++
       return res.json(user.entries);
     }
   })
   if (!found) {
     res.status(400).json("not found ");
   }
})


app.listen(4000, () => {
    console.log('app is running on port 4000');
});

