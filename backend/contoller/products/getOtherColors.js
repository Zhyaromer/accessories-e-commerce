const db = require("../../config/sql.js");

const getOtherColors = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    try {
        const query = `select group_id from products where id = ?`;
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const groupId = rows[0].group_id;
        const query2 = `select id,title,category,price,cardimg,isSoldOut,discount_price,isDiscounted from products where group_id = ? and id != ?`;
        const [rows2] = await db.query(query2, [groupId, id]);
        if (rows2.length === 0) {
            return res.status(404).json({ message: "No other colors found" });
        }
        res.status(200).json(rows2);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    } 
}

module.exports = getOtherColors