import React from 'react'
import ProductList from '../components/myComponents/ui/ProductList';
import axios from 'axios';
import Nav from '../components/myComponents/ui/Nav';
import { useState, useEffect } from 'react'

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    
    const categories = [
        { _id: "کاتژمێر", name: "کاتژمێر" },
        { _id: "clothing", name: "Clothing" },
        { _id: "Footwear", name: "Footwear" },
        { _id: "home", name: "Home & Kitchen" },
        { _id: "beauty", name: "Beauty & Personal Care" }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'http://localhost:3000/products/getall';
                const queryParams = [];
                
                if (selectedCategory) {
                    queryParams.push(`category=${selectedCategory}`);
                }
                
                if (sortOrder) {
                    queryParams.push(`sort=${sortOrder}`);
                }
                
                if (queryParams.length > 0) {
                    url += `?${queryParams.join('&')}`;
                }
                
                const res = await axios.get(url);

                if (res.status === 200) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, [selectedCategory, sortOrder]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    return (
        <div>
            <Nav />
            <div className="container mx-auto px-4">
                <div className="mt-16">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="w-full md:w-auto">
                            <select
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    sortOrder === 'asc' 
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                                onClick={() => handleSortChange('asc')}
                            >
                                Price: Low to High
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    sortOrder === 'desc' 
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                                onClick={() => handleSortChange('desc')}
                            >
                                Price: High to Low
                            </button>
                        </div>
                    </div>
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    )
}