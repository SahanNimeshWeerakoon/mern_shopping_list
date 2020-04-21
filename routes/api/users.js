const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email })
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            const newUser = new User({
                name, email, password
            });

            // generate salt and hash
            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                        });
                });
            });
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            user.remove()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.json(err));
});

module.exports = router;