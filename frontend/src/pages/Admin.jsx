import { useState, useEffect, use } from 'react';
import { Search, Plus, Edit, Trash2, X, Save, ArrowDown, ArrowUp, Package, DollarSign, ShoppingCart, Archive } from 'lucide-react';
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
        const mockProducts = [
            {
                id: 1,
                group_id: 1,
                title: "Silver Necklace",
                category: "Jewelry",
                size: "Medium",
                color: "Silver",
                price: 49,
                stock: 15,
                cardimg: "/api/placeholder/400/300",
                isSoldOut: 0,
                created_at: "2025-03-10T14:30:00",
                discount_price: 39,
                isDiscounted: 1,
                images: [
                    { id: 1, p_id: 1, imgURL: "/api/placeholder/400/400" },
                    { id: 2, p_id: 1, imgURL: "/api/placeholder/400/400" }
                ]
            },
            {
                id: 2,
                group_id: 1,
                title: "Gold Bracelet",
                category: "Jewelry",
                size: "Small",
                color: "Gold",
                price: 99,
                stock: 8,
                cardimg: "/api/placeholder/400/300",
                isSoldOut: 0,
                created_at: "2025-03-15T11:20:00",
                discount_price: 0,
                isDiscounted: 0,
                images: [
                    { id: 3, p_id: 2, imgURL: "/api/placeholder/400/400" }
                ]
            },
            {
                id: 3,
                group_id: 2,
                title: "Leather Watch",
                category: "Watches",
                size: "Large",
                color: "Brown",
                price: 159,
                stock: 0,
                cardimg: "/api/placeholder/400/300",
                isSoldOut: 1,
                created_at: "2025-02-25T09:45:00",
                discount_price: 129,
                isDiscounted: 1,
                images: [
                    { id: 4, p_id: 3, imgURL: "/api/placeholder/400/400" },
                    { id: 5, p_id: 3, imgURL: "/api/placeholder/400/400" }
                ]
            },
            {
                id: 4,
                group_id: 3,
                title: "Designer Sunglasses",
                category: "Eyewear",
                size: "One Size",
                color: "Black",
                price: 129,
                stock: 12,
                cardimg: "/api/placeholder/400/300",
                isSoldOut: 0,
                created_at: "2025-04-01T16:15:00",
                discount_price: 0,
                isDiscounted: 0,
                images: [
                    { id: 6, p_id: 4, imgURL: "/api/placeholder/400/400" }
                ]
            },
            {
                id: 5,
                group_id: 4,
                title: "Pearl Earrings",
                category: "Jewelry",
                size: "Small",
                color: "White",
                price: 79,
                stock: 20,
                cardimg: "/api/placeholder/400/300",
                isSoldOut: 0,
                created_at: "2025-03-20T13:10:00",
                discount_price: 69,
                isDiscounted: 1,
                images: [
                    { id: 7, p_id: 5, imgURL: "/api/placeholder/400/400" },
                    { id: 8, p_id: 5, imgURL: "/api/placeholder/400/400" }
                ]
            }
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
    }, []);

    useEffect(() => {
        const checkAuth = async () => { 
            const response = await axios.get('/admin/checkauth', { withCredentials: true });
            console.log(response.status);
            if (response.status === 401) {
                window.location.href = '/admin/login';
            }
        }

        checkAuth();
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleAddProduct = () => {
        const maxId = Math.max(...products.map(p => p.id), 0);
        const productToAdd = {
            ...newProduct,
            id: maxId + 1,
            created_at: new Date().toISOString()
        };

        setProducts([...products, productToAdd]);
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
    };

    const handleEditProduct = () => {
        const updatedProducts = products.map(product =>
            product.id === selectedProduct.id ? selectedProduct : product
        );

        setProducts(updatedProducts);
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = () => {
        const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
        setProducts(updatedProducts);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const handleAddImage = () => {
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
            const updatedImages = [...selectedProduct.images];
            updatedImages[index] = { ...updatedImages[index], imgURL: value };
            setSelectedProduct({
                ...selectedProduct,
                images: updatedImages
            });
        } else {
            const updatedImages = [...newProduct.images];
            updatedImages[index] = { ...updatedImages[index], imgURL: value };
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
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Accessories Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Products</p>
                            <p className="text-xl font-semibold">{totalProducts}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 flex items-center">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <ShoppingCart className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Stock</p>
                            <p className="text-xl font-semibold">{totalStock}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 flex items-center">
                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                            <DollarSign className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Discounted Items</p>
                            <p className="text-xl font-semibold">{discountedProducts}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 flex items-center">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                            <Archive className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Out of Stock</p>
                            <p className="text-xl font-semibold">{outOfStockProducts}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add New Product
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID
                                            {sortConfig.key === 'id' && (
                                                sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('title')}
                                    >
                                        <div className="flex items-center">
                                            Product
                                            {sortConfig.key === 'title' && (
                                                sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('category')}
                                    >
                                        <div className="flex items-center">
                                            Category
                                            {sortConfig.key === 'category' && (
                                                sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('price')}
                                    >
                                        <div className="flex items-center">
                                            Price
                                            {sortConfig.key === 'price' && (
                                                sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('stock')}
                                    >
                                        <div className="flex items-center">
                                            Stock
                                            {sortConfig.key === 'stock' && (
                                                sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {product.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-10 w-10 rounded-md object-cover" src={product.cardimg} alt={product.title} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                        <div className="text-sm text-gray-500">{product.color} / {product.size}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.isDiscounted ? (
                                                    <div>
                                                        <span className="text-sm text-gray-900 font-medium">${product.discount_price}</span>
                                                        <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-900 font-medium">${product.price}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.isSoldOut || product.stock === 0 ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Out of Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-900">{product.stock}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
                            <button onClick={() => setIsAddModalOpen(false)}>
                                <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.size}
                                        onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.color}
                                        onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newProduct.cardimg}
                                        onChange={(e) => setNewProduct({ ...newProduct, cardimg: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isSoldOut"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={newProduct.isSoldOut === 1}
                                        onChange={(e) => setNewProduct({ ...newProduct, isSoldOut: e.target.checked ? 1 : 0 })}
                                    />
                                    <label htmlFor="isSoldOut" className="ml-2 block text-sm text-gray-900">
                                        Mark as Sold Out
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isDiscounted"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={newProduct.isDiscounted === 1}
                                        onChange={(e) => setNewProduct({ ...newProduct, isDiscounted: e.target.checked ? 1 : 0 })}
                                    />
                                    <label htmlFor="isDiscounted" className="ml-2 block text-sm text-gray-900">
                                        Apply Discount
                                    </label>
                                </div>
                                {newProduct.isDiscounted === 1 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={newProduct.discount_price}
                                            onChange={(e) => setNewProduct({ ...newProduct, discount_price: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                        onClick={handleAddImage}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Image
                                    </button>
                                </div>

                                {newProduct.images.map((image, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={image.imgURL}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                        />
                                        {newProduct.images.length > 1 && (
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center"
                                onClick={handleAddProduct}
                            >
                                <Save className="h-4 w-4 mr-1" />
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
                            <button onClick={() => setIsEditModalOpen(false)}>
                                <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                        value={selectedProduct.id}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.title}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.category}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.size}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, size: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.color}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.price}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.stock}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedProduct.cardimg}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, cardimg: e.target.value })}
                                    />
                                </div>
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
                                {selectedProduct.isDiscounted === 1 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={selectedProduct.discount_price}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, discount_price: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                        onClick={handleAddImage}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Image
                                    </button>
                                </div>

                                {selectedProduct.images.map((image, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={image.imgURL}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                        />
                                        {selectedProduct.images.length > 1 && (
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center"
                                onClick={handleEditProduct}
                            >
                                <Save className="h-4 w-4 mr-1" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete <span className="font-semibold">{selectedProduct.title}</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg flex items-center"
                                onClick={handleDeleteProduct}
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}