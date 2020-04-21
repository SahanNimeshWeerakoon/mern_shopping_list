const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    auth = require('../../middleware/auth');

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: 'User does not exists' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg : 'Invalid credentials' });

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

// Get user data
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;