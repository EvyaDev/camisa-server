const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// 1️⃣ קבלת כל ההזמנות
router.get("/", (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2️⃣ הוספת הזמנה חדשה
router.post("/", (req, res) => {
    const { type, status } = req.body;
    db.query(
        "INSERT INTO orders (type, status) VALUES (?, ?)",
        [type, status],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, type, status });
        }
    );
});

// 3️⃣ עדכון סטטוס הזמנה
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "סטטוס עודכן בהצלחה!" });
        }
    );
});

// 4️⃣ מחיקת הזמנה
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM orders WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "ההזמנה נמחקה בהצלחה!" });
    });
});

module.exports = router;
