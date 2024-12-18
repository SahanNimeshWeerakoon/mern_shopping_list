const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(cors())

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1)",
            [ description ]
        );
        return res.json(newTodo)
    } catch(err) {
        console.log(err)
    }
});

app.listen(5000, () => {
    console.log("listening to port 5000");
});