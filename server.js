const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

    
const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(dB.users);
})

app.post('/signin', (req, res) => { 
    signin.handleSignin(req, res, database, bcrypt)
})

app.post('/register', (req, res) => {
    register.handleRegister(req, res, database, bcrypt)
})          

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, database)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, database)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res, database)
})

app.listen(3000, () => {
    console.log('app runs');
})