const mysql = require("mysql2");

const db = mysql.createPool({
    host: '62.219.58.195',      // כתובת ה-IP של השרת שלך
    user: 'loccacoi_admin',    // שם המשתמש למסד הנתונים
    password: 'P*E.GCET&{&n',// הסיסמה שלך
    database: 'loccacoi_camisa-db',    // שם מסד הנתונים
    port: 3306,                  // הפורט (בדרך כלל 3306 ל-MySQL)
    connectTimeout: 10000,  // הגדרת timeout של 10 שניות
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;