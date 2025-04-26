import React from 'react';
import ProductList from '../components/myComponents/ui/ProductList';
import axios from 'axios';
import Nav from '../components/myComponents/ui/Nav';
import { useState, useEffect } from 'react';
import { ChevronDown, Check, Filter } from 'lucide-react';
import Footer from '../components/myComponents/ui/Footer';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'; // React Router imports

function EnhancedCategoryDropdown({ categories, selectedCategory, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState('هەموو بەرهەمەکان');

    useEffect(() => {
        if (!selectedCategory) {
            setDisplayValue('هەموو بەرهەمەکان');
        } else {
            const category = categories.find(c => c._id === selectedCategory);
            if (category) setDisplayValue(category.name);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    const handleSelect = (categoryId) => {
        onChange(categoryId);
        setIsOpen(false);
    };

    return (
        <div dir='rtl' className="relative z-50 w-full md:w-64">
            <button
                type="button"
                className="cursor-pointer flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[hsl(258,57%,60%)] transition-all duration-200"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-[hsl(258,57%,60%)]" />
                    <span className="text-gray-700 font-medium">{displayValue}</span>
                </div>
                <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto custom-scrollbar">
                    <div
                        className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleSelect('')}
                    >
                        <div className="flex-1">هەموو بەرهەمەکان</div>
                        {!selectedCategory && <Check size={16} className="text-[hsl(258,57%,60%)]" />}
                    </div>

                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleSelect(category._id)}
                        >
                            <div className="flex-1">{category.name}</div>
                            {selectedCategory === category._id && <Check size={16} className="text-[hsl(258,57%,60%)]" />}
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: red;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: red;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: red;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #b29ce4 white;
        }
      `}</style>
        </div>
    );
}

export default function AllProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || '');

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
                let url = 'http://localhost:4000/products/getall';
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

                console.log(url);
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

        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (sortOrder) params.set('sort', sortOrder);
        
        setSearchParams(params);
        
    }, [selectedCategory, sortOrder, setSearchParams]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
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
                            <EnhancedCategoryDropdown
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onChange={handleCategoryChange}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${sortOrder === 'asc'
                                        ? 'bg-[hsl(258,57%,60%)] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                onClick={() => handleSortChange('asc')}
                            >
                                نرخ: کەمترین بۆ زۆرترین
                            </button>
                            <button
                                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${sortOrder === 'desc'
                                        ? 'bg-[hsl(258,57%,60%)] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                onClick={() => handleSortChange('desc')}
                            >
                                نرخ: زۆرترین بۆ کەمترین
                            </button>
                        </div>
                    </div>

                    <div dir='rtl' className='flex justify-start'>
                        <p className="text-base">{products.length} بەرهەم دۆزرایەوە</p>
                    </div>

                    <ProductList products={products} />

                    {products.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            No products found for the {selectedCategory || 'all'} category.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}