const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ordersRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// שימוש בנתיבים להזמנות
app.use("/api/orders", ordersRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    app.get
});
app.get('/', (req, res) => { res.send("Welcome to API server") });
