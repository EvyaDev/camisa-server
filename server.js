const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // חיבור למסד נתונים

const app = express();
app.use(cors());
app.use(bodyParser.json());

const checkDbConnection = () => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database!');
        connection.release(); // שחרר את החיבור
    });
};

checkDbConnection();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

