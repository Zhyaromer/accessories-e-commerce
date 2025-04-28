const db = require("../../config/sql.js");

const getNewestProducts = async (_req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
            p.id,p.title,p.category,p.price,p.cardimg,p.isSoldOut,p.discount_price,p.isDiscounted, 
            (
                SELECT GROUP_CONCAT(DISTINCT color ORDER BY color SEPARATOR ', ')
                FROM products 
                WHERE group_id = p.group_id
            ) AS colors
            FROM products p ORDER BY created_at DESC LIMIT 6
            `);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getNewestProducts;