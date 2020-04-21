const express = require('express')
    mongoose = require('mongoose')
    cors = require('cors'),
    config = require('config');

const db = config.get('mongoURI');

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('mongodb connected ...'))
    .catch(err => console.log(err));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`server listening to port ${PORT}`));