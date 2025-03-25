const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const con = require("./dbConnection"); // חיבור למסד נתונים

const PORT = process.env.PORT || 4000;

const app = express();
// app.use(bodyParser.json());

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
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('./router')(app);