const con = require('./dbConnection');

function updateOrder(req, res) {
    con.query(
        "UPDATE `orders` SET `status`=? WHERE `orders`.`id` = ?",
        [req.body.status, req.params.id],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            console.log(result);
            res.json({ message: "Order updated successfully", result });
        }
    );
}

function deleteOrderById(req, res) {
    con.query("DELETE FROM `orders` WHERE `order`.`id` = ?", [req.params.id],
        (err) => {

            if (err) {
                throw err;
            }
            res.send();
        }
    )
}

exports.updateOrder = updateOrder;
exports.deleteOrderById = deleteOrderById;
