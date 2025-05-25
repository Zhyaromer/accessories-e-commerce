import { useState, useEffect, use } from 'react';
import { Search, Plus, Edit, Trash2, X, Save, ArrowDown, ArrowUp, Package, DollarSign, ShoppingCart, Archive, Bell } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: '',
        group_id: null,
        size: '',
        color: '',
        price: 0,
        stock: 0,
        cardimg: '',
        isSoldOut: 0,
        isDiscounted: 0,
        discount_price: 0,
        images: [{ imgURL: '' }]
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://accessories-e-commerce.onrender.com/admin/getAllProducts', { withCredentials: true });
                setProducts(response.data);
                setFilteredProducts(response.data);
            }
            catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('https://accessories-e-commerce.onrender.com/admin/checkauth', {
                withCredentials: true
            });
            return response.data.authenticated;
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
    };

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await checkAuthStatus();
            if (!isAuthenticated) {
                navigate('/admin/login');
            }
        };
        verifyAuth();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://accessories-e-commerce.onrender.com/admin/deleteProduct/${id}`, { withCredentials: true });
            setProducts(products.filter(product => product.id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    useEffect(() => {
        const results = products.filter(product =>
            product?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            product?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );

        setFilteredProducts(results);
    }, [searchTerm, products]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredProducts(sortedProducts);
    };

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('https://accessories-e-commerce.onrender.com/admin/addProduct', newProduct, { withCredentials: true });
            if (response.status === 201) {
                const addedProduct = { ...newProduct, id: response.data.productId };
                setProducts([...products, addedProduct]);
                setFilteredProducts([...filteredProducts, addedProduct]);
                setIsAddModalOpen(false);
                setNewProduct({
                    title: '',
                    category: '',
                    size: '',
                    color: '',
                    price: 0,
                    stock: 0,
                    cardimg: '',
                    isSoldOut: 0,
                    isDiscounted: 0,
                    discount_price: 0,
                    images: [{ imgURL: '' }]
                });
            } else {
                console.error("Failed to add product:", response.data.message);
            }
        } catch (err) {
            console.error("Error adding product:", err);
        }

    };

    const handleEditProduct = async () => {
        try {
            if (selectedProduct) {
                const res = await axios.patch(`https://accessories-e-commerce.onrender.com/admin/updateProduct/${selectedProduct.id}`, selectedProduct, { withCredentials: true });
                if (res.status === 200) {
                    const updatedProducts = products.map(product => product.id === selectedProduct.id ? selectedProduct : product);
                    setProducts(updatedProducts);
                    setFilteredProducts(updatedProducts);
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                } else {
                    console.error("Failed to update product:", res.data.message);
                }
            }
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    const handleAddImage = () => {
        console.log("Adding image", selectedProduct);
        if (isEditModalOpen && selectedProduct) {
            setSelectedProduct({
                ...selectedProduct,
                images: [...selectedProduct.images, { imgURL: '' }]
            });
        } else {
            setNewProduct({
                ...newProduct,
                images: [...newProduct.images, { imgURL: '' }]
            });
        }
    };

    const handleRemoveImage = (index) => {
        if (isEditModalOpen && selectedProduct) {
            const updatedImages = [...selectedProduct.images];
            updatedImages.splice(index, 1);
            setSelectedProduct({
                ...selectedProduct,
                images: updatedImages
            });
        } else {
            const updatedImages = [...newProduct.images];
            updatedImages.splice(index, 1);
            setNewProduct({
                ...newProduct,
                images: updatedImages
            });
        }
    };

    const handleImageChange = (index, value) => {
        if (isEditModalOpen && selectedProduct) {
            const updatedImages = selectedProduct.images.map((img, i) =>
                i === index ? { imgURL: value } : img
            );
            setSelectedProduct({
                ...selectedProduct,
                images: updatedImages
            });
        } else {
            const updatedImages = newProduct.images.map((img, i) =>
                i === index ? { imgURL: value } : img
            );
            setNewProduct({
                ...newProduct,
                images: updatedImages
            });
        }
    };

    const totalProducts = products.length;
    const outOfStockProducts = products.filter(p => p.stock === 0 || p.isSoldOut === 1).length;
    const discountedProducts = products.filter(p => p.isDiscounted === 1).length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Accessories Dashboard</h1>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-100">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-100">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <ShoppingCart className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-600">Total Stock</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-sm p-6 border border-amber-100">
                        <div className="flex items-center">
                            <div className="bg-amber-100 p-3 rounded-lg mr-4">
                                <DollarSign className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-amber-600">Discounted Items</p>
                                <p className="text-2xl font-bold text-gray-900">{discountedProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-6 border border-red-100">
                        <div className="flex items-center">
                            <div className="bg-red-100 p-3 rounded-lg mr-4">
                                <Archive className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-red-600">Out of Stock</p>
                                <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add New Product
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => requestSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID
                                            {sortConfig.key === 'id' && (
                                                sortConfig.direction === 'ascending' ?
                                                    <ArrowUp className="h-4 w-4 ml-1 text-gray-600" /> :
                                                    <ArrowDown className="h-4 w-4 ml-1 text-gray-600" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => requestSort('title')}
                                    >
                                        <div className="flex items-center">
                                            Product
                                            {sortConfig.key === 'title' && (
                                                sortConfig.direction === 'ascending' ?
                                                    <ArrowUp className="h-4 w-4 ml-1 text-gray-600" /> :
                                                    <ArrowDown className="h-4 w-4 ml-1 text-gray-600" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => requestSort('category')}
                                    >
                                        <div className="flex items-center">
                                            Category
                                            {sortConfig.key === 'category' && (
                                                sortConfig.direction === 'ascending' ?
                                                    <ArrowUp className="h-4 w-4 ml-1 text-gray-600" /> :
                                                    <ArrowDown className="h-4 w-4 ml-1 text-gray-600" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => requestSort('price')}
                                    >
                                        <div className="flex items-center">
                                            Price
                                            {sortConfig.key === 'price' && (
                                                sortConfig.direction === 'ascending' ?
                                                    <ArrowUp className="h-4 w-4 ml-1 text-gray-600" /> :
                                                    <ArrowDown className="h-4 w-4 ml-1 text-gray-600" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => requestSort('stock')}
                                    >
                                        <div className="flex items-center">
                                            Stock
                                            {sortConfig.key === 'stock' && (
                                                sortConfig.direction === 'ascending' ?
                                                    <ArrowUp className="h-4 w-4 ml-1 text-gray-600" /> :
                                                    <ArrowDown className="h-4 w-4 ml-1 text-gray-600" />
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts?.length > 0 ? (
                                    filteredProducts?.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{product.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-md object-cover border border-gray-200" src={product.cardimg} alt={product.title} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                        <div className="text-xs text-gray-500">{product.color} / {product.size}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.isDiscounted ? (
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium text-gray-900">${product.discount_price}</span>
                                                        <span className="text-xs text-gray-500 line-through ml-2">${product.price}</span>
                                                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                            Sale
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-900">${product.price}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.isSoldOut || product.stock === 0 ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Out of Stock
                                                    </span>
                                                ) : product.stock < 10 ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                        Low Stock: {product.stock}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        In Stock: {product.stock}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search className="h-12 w-12 text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                                                <p className="text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                                <button
                                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                                                    onClick={() => setIsAddModalOpen(true)}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add New Product
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
                        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                        placeholder="Product Title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="home goods">Home Goods</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.size}
                                        placeholder="Size (e.g., S, M, L)"
                                        onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.color}
                                        onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                                    >
                                        <option value="">Select a color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Group ID</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.group_id}
                                        placeholder="Group ID"
                                        onChange={(e) => setNewProduct({ ...newProduct, group_id: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.price}
                                        required
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.stock}
                                        required
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Image URL*</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={newProduct.cardimg}
                                        placeholder="Card Image URL"
                                        onChange={(e) => setNewProduct({ ...newProduct, cardimg: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                                        onClick={handleAddImage}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Image
                                    </button>
                                </div>

                                {newProduct?.images?.map((image, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                            value={image.imgURL}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                        />
                                        {newProduct.images.length > 1 && (
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                            <button
                                type="button"
                                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg flex items-center shadow-sm hover:shadow-md transition-all"
                                onClick={handleAddProduct}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
                        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 cursor-not-allowed"
                                        value={selectedProduct.id}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.title}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.category}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="home goods">Home Goods</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.size}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, size: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.color}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                                    >
                                        <option value="">Select a color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.price}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseInt(e.target.value) || 0 })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.stock}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) || 0 })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Image URL*</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        value={selectedProduct.cardimg}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, cardimg: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="editIsSoldOut"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={selectedProduct.isSoldOut === 1}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, isSoldOut: e.target.checked ? 1 : 0 })}
                                        />
                                        <label htmlFor="editIsSoldOut" className="ml-2 block text-sm text-gray-900">
                                            Mark as Sold Out
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="editIsDiscounted"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={selectedProduct.isDiscounted === 1}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, isDiscounted: e.target.checked ? 1 : 0 })}
                                        />
                                        <label htmlFor="editIsDiscounted" className="ml-2 block text-sm text-gray-900">
                                            Apply Discount
                                        </label>
                                    </div>
                                </div>
                                {selectedProduct.isDiscounted === 1 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)*</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                            value={selectedProduct.discount_price}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, discount_price: parseInt(e.target.value) || 0 })}
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                                        onClick={handleAddImage}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Image
                                    </button>
                                </div>

                                {selectedProduct?.images?.map((image, index) => {
                                    const imgUrl = typeof image === 'string' ? image : image?.imgURL || '';
                                    return (
                                        <div key={index} className="flex items-center gap-3 mb-3">
                                            <input
                                                type="text"
                                                placeholder="Image URL"
                                                className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                                value={imgUrl}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                            />
                                            {selectedProduct.images.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                            <button
                                type="button"
                                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg flex items-center shadow-sm hover:shadow-md transition-all"
                                onClick={handleEditProduct}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                                <Trash2 className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Product</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedProduct.title}</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-center gap-3 rounded-b-xl">
                            <button
                                type="button"
                                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-1/2"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all w-1/2"
                                onClick={() => {
                                    deleteProduct(selectedProduct.id);
                                    setIsDeleteModalOpen(false);
                                }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}