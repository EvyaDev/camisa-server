const express = require("express");
const cors = require("cors");
const con = require("./dbConnection"); // חיבור למסד נתונים
const app = express();
app.use(express.json());
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");


const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));


app.get('/orders', (req, res) => {

    con.query("SELECT * FROM `orders`", (err, result) => {
        if (err) {
            return res.status(403).send("שגיאה");
        }

        res.send(result);
    });
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'methods.log'), { flags: 'a' })
app.use(morgan(':method - url: ":url" status: :status | (:response-time ms) [:date[web]]', { stream: accessLogStream }))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('./router')(app);