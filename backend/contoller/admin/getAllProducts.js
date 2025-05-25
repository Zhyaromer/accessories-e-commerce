const db = require('../../config/sql.js');

const getAllProducts = async (_req, res) => {
    try {
        const query = `
            SELECT 
                p.id, p.title, p.category, p.price, p.cardimg, 
                p.isSoldOut, p.discount_price, p.isDiscounted, 
                p.color, p.size, p.stock,
                GROUP_CONCAT(pi.imgURL) AS images
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.p_id
            GROUP BY p.id`;

        const [rows] = await db.query(query);

        const formattedRows = rows.map(row => ({
            ...row,
            images: row.images ? row.images.split(',') : []
        }));

        res.status(200).json(formattedRows);
    } catch (err) {
        console.error('getAllProducts error:', err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

module.exports = getAllProducts;