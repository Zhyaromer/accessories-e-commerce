const db = require("../../config/sql.js");

const getAllProducts = async (_req, res) => {
    try {
        const query = `
            SELECT p.id, p.title, p.category, p.price, p.cardimg, 
                   p.isSoldOut, p.discount_price, p.isDiscounted, 
                   p.color, p.size, p.stock,
                   JSON_ARRAYAGG(pi.imgURL) AS images
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.p_id
            GROUP BY p.id`;
            
        const [rows] = await db.query(query);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        
        rows.forEach(row => {
            if (row.images && row.images[0] !== null) {
                row.images = JSON.parse(JSON.stringify(row.images));
            } else {
                row.images = [];
            }
        });

        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = getAllProducts;