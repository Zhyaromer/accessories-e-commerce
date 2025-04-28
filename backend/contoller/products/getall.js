const db = require("../../config/sql.js");

const getAllProducts = async (_req, res) => {
    const { category, sort } = _req.query;

    try {
        let sql = `
            SELECT 
                p.id, p.title, p.category, p.price, p.cardimg, p.isSoldOut, p.discount_price, p.isDiscounted,
                (
                    SELECT GROUP_CONCAT(DISTINCT color ORDER BY color SEPARATOR ', ')
                    FROM products 
                    WHERE group_id = p.group_id
                ) AS colors
            FROM products p
        `;

        let queryParams = [];
        if (category) {
            sql += ` WHERE p.category = ?`;
            queryParams.push(category);
        }

        sql += ` ORDER BY p.isSoldOut ASC`;

        if (sort) {
            sql += ` ,p.isDiscounted ${sort === "asc" ? "desc" : "asc"}, p.discount_price ${sort}, p.price ${sort}`;
        }

        const [rows] = await db.query(sql, queryParams);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getAllProducts;