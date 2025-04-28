const db = require("../../config/sql.js");

const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    const { title, category, price, cardimg, isSoldOut, discount_price, isDiscounted, color, size, stock, images } = req.body;

    if (!title || !category || !price || !cardimg || !color || !stock) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const connection = await db.getConnection();

    if (!connection) {
        return res.status(500).json({ message: "Database connection failed" });
    }

    try {
        await connection.beginTransaction();

        const query = `
            UPDATE products 
            SET title = ?, category = ?, price = ?, cardimg = ?, isSoldOut = ?, discount_price = ?, isDiscounted = ?, color = ?, size = ?, stock = ? 
            WHERE id = ?`;
        const values = [title, category, price, cardimg, isSoldOut, discount_price, isDiscounted, color, size, stock, id];

        const [result] = await connection.query(query, values);
        if (result.affectedRows === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ message: "Product not found" });
        }

        if (images && images.length > 0) {
            const deleteQuery = `DELETE FROM product_images WHERE p_id = ?`;
            const [deleteResult] = await connection.query(deleteQuery, [id]);

            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(500).json({ message: "Failed to delete old product images" });
            }

            const insertQuery = `INSERT INTO product_images (p_id, imgURL) VALUES ?`;
            const imageValues = images.map(img => [id, img.imgURL]);
            const [insertResult] = await connection.query(insertQuery, [imageValues]);

            if (insertResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(500).json({ message: "Failed to update product images" });
            }
        }

        await connection.commit();
        connection.release();

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = updateProduct