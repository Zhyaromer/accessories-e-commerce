const db = require('../../config/sql.js');

const getAllProducts = async (_req, res) => {
    try {
        const query = `
            SELECT 
                p.id, 
                p.title, 
                p.category, 
                p.price, 
                p.cardimg, 
                p.isSoldOut, 
                p.discount_price, 
                p.isDiscounted, 
                p.color, 
                p.size, 
                p.stock
            FROM products p
            ORDER BY p.id`;

        console.log('Executing products query...'); 
        
        const [products] = await db.query(query);
        
        console.log(`Found ${products.length} products`); 

        const imageQuery = `
            SELECT p_id, imgURL 
            FROM product_images 
            ORDER BY p_id`;
            
        const [images] = await db.query(imageQuery);
        
        console.log(`Found ${images.length} images`); 
        
        const imagesByProduct = {};
        images.forEach(img => {
            if (!imagesByProduct[img.p_id]) {
                imagesByProduct[img.p_id] = [];
            }
            imagesByProduct[img.p_id].push(img.imgURL);
        });
        
        const formattedRows = products.map(product => ({
            id: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            cardimg: product.cardimg,
            isSoldOut: product.isSoldOut,
            discount_price: product.discount_price,
            isDiscounted: product.isDiscounted,
            color: product.color,
            size: product.size,
            stock: product.stock,
            images: imagesByProduct[product.id] || []
        }));

        console.log(`Returning ${formattedRows.length} formatted products`); 
        res.status(200).json(formattedRows);
        
    } catch (err) {
        console.error('getAllProducts error:', err);
        console.error('Error details:', {
            message: err.message,
            code: err.code,
            errno: err.errno,
            sqlState: err.sqlState,
            sqlMessage: err.sqlMessage
        });
        
        res.status(500).json({ 
            error: "Internal server error", 
            details: err.message
        });
    }
};

module.exports = getAllProducts;