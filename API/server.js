const express = require("express");
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
}); 

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    bcrypt.compare(req.body.password, database.users[database.users.length-1].password, function(err, resB) {
        if (resB) {
            res.json({
                id: database.users[0].id,
                name: database.users[0].name,
                email: database.users[0].email,
                entries: database.users[0].entries,
                joined: database.users[0].joined
            });
        } else {
            res.status(400).json("error logging in");
        }
    });
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db('users')
                .returning('*')
                .insert({
                    name: name,
                    email: email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('unable to register'));
        });
    });
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json("error getting user");
            }
        });
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => {
            res.status(400).json('unable to get entries');
        });
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});