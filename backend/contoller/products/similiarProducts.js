const db = require("../../config/sql.js");

const getSimilarProducts = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    try {
        const query = `select category from products where id = ?`;
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const category = rows[0].category;
        const query2 = `select id,title,category,price,cardimg,isSoldOut,discount_price,isDiscounted from products where category = ? and id != ?`;
        const [rows2] = await db.query(query2, [category, id]);
        if (rows2.length === 0) {
            return res.status(404).json({ message: "No other colors found" });
        }
        res.status(200).json(rows2);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    } 
}

module.exports = getSimilarProducts