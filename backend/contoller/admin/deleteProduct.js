const db = require("../../config/sql.js");

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    try {
        const query = `delete from products where id = ?`;
        const [rows] = await db.query(query, [id]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteProduct;