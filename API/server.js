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
            db('users').insert({
                name: name,
                email: email,
                joined: new Date()
            }).then(console.log);
        
            res.json({
                id: "125",
                name: name,
                email: email,
                entries: 0,
                joined: new Date()
            });
        });
    });
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {
        res.status(404).json('no such user');
    }
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }

        if (!found) {
            res.status(404).json('no such user');
        }
    });
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});