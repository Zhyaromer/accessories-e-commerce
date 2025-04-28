const db = require("../../config/sql.js");

const getCheckoutProducts = async (_req, res) => {
    const { ids } = _req.query;

    try {
        const idArray = ids.split(',').map(id => parseInt(id.trim(), 10));

        const sql = `
            SELECT 
                id, title, category, price, cardimg, isSoldOut, discount_price, isDiscounted
            FROM products
            WHERE id IN (?)
        `;

        const placeholders = idArray.map(() => '?').join(',');
        const modifiedSql = sql.replace('IN (?)', `IN (${placeholders})`);
        
        const [rows] = await db.query(modifiedSql, idArray);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getCheckoutProducts;