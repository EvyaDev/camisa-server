const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // חיבור למסד נתונים

const app = express();
app.use(cors());
app.use(bodyParser.json());

// פונקציה לבדוק אם החיבור למסד הנתונים הצליח ולהריץ שאילתת SELECT
const checkDbConnection = () => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        // הרץ את השאילתת SELECT
        connection.query('SELECT * FROM orders', (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return;
            }
            // הצג את התוצאות בקונסול
            console.log('Data from orders table:', results);
        });

        console.log('Connected to the database!');
        connection.release(); // שחרר את החיבור
    });
};

// קריאה לפונקציה לחיבור למסד הנתונים
checkDbConnection();

// נתיב ברירת מחדל שיחזיר את הודעת הצלחה
app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
