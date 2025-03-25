const { updateOrder, deleteOrderById } = require("./orders");

module.exports = (app) => {
    app.get('/', (req, res) => res.send('ברוכים הבאים'));
    app.put("/order/:id", updateOrder);
    app.delete("/del-order/:id", deleteOrderById);
}