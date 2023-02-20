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

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            if (data.length) {
                bcrypt.compare(req.body.password, data[0].hash, function(err, resB) {
                    if (resB) {
                        db.select('*').from('users')
                            .where('email', '=', req.body.email)
                            .then(user => {
                                res.json(user[0]);
                            })
                            .catch(sErr => {
                                res.status(400).json("unable to get user");
                            });
                    } else {
                        res.status(400).json("wrong credentials");
                    }
                });
            } else {
                res.status(400).json("wrong credentials");
            }
        });
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx => {
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0].email,
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        });
                })
                .then(trx.commit)
                .catch(trx.rollback);
            }).catch(rError => res.status(400).json('unable to register'));
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