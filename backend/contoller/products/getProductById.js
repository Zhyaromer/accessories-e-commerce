const db = require("../../config/sql.js");

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql1 = ` 
       SELECT 
                p.id, p.title,p.stock,p.color, p.category,p.size, p.price, p.cardimg, p.isSoldOut, p.discount_price, p.isDiscounted,
                (
                    SELECT GROUP_CONCAT(DISTINCT color ORDER BY color SEPARATOR ', ')
                    FROM products 
                    WHERE group_id = p.group_id
                ) AS colors
            FROM products p WHERE p.id = ?;`;

        const sql2 = `select imgURL from product_images where p_id = ?`;

        const [rows] = await db.query(sql1, [id]);
        const [images] = await db.query(sql2, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ ...rows[0], images: images});
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });   
    }
}

module.exports = getProductById