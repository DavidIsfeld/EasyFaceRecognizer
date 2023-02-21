const handleSignin = (db, bcrypt) => (req, res) => {
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
};

module.exports = {
    handleSignin: handleSignin
}