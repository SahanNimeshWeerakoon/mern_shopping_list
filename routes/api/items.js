const express = require('express')
    router = express.Router()
    Item = require('../../models/Item'),
    auth = require('../../middleware/auth');


router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
});

router.delete('/:id', auth, (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => {
            item
                .remove()
                .then(delItem => res.json(delItem))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;