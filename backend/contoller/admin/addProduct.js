const db = require("../../config/sql.js");

const addProduct = async (req, res) => {
    const { title, group_id, category, price, cardimg, size, color, stock,images } = req.body;

    if (!title || !category || !price || !cardimg || !color || !stock) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const query = `INSERT INTO products (title, group_id, category, price, cardimg, size, color, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [rows] = await db.query(query, [title, group_id, category, price, cardimg, size, color, stock]);
         
        if (rows.affectedRows === 0) {
            return res.status(500).json({ message: "Failed to add product" });
        }

        images.forEach(async (image) => {
            console.log(image?.imgURL);
        });

        if (images && images.length > 0) {
            images.forEach(async (image) => {
                const imageQuery = `INSERT INTO product_images (p_id, imgURL) VALUES (?, ?)`;
                await db.query(imageQuery, [rows.insertId, image?.imgURL]);
            });
        }

        res.status(201).json({ message: "Product added successfully", productId: rows.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = addProduct