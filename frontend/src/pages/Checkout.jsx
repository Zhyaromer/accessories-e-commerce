import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/myComponents/ui/Nav';
import Footer from '../components/myComponents/ui/Footer';
import { useNavigate } from 'react-router-dom';

const AmazonStyleCheckout = () => {
  const navigate = useNavigate();
  const cities = [
    { name: 'هەولێر', cost: 4 },
    { name: 'سلێمانی', cost: 3 },
    { name: 'دهۆک', cost: 8 },
    { name: 'کەرکوک', cost: 10 },
    { name: 'هەڵەبجە', cost: 12 },
  ];

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCart(cartItems);

      const ids = cartItems.map(item => item.id);
      if (ids.length > 0) {
        fetchProducts(ids);
      }
    }
  }, []);

  const fetchProducts = async (ids) => {
    try {
      const response = await axios.get('http://localhost:4000/products/getcheckout?ids=' + ids.join(','));
      const productsData = response.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
  }, [selectedCity]);

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const city = cities.find(c => c.name === cityName);
    setSelectedCity(city);
  };

  const calculateItemTotal = (item) => {
    const product = products.find(p => p.id === item.id);
    return product?.price
  };

  const subtotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const shippingCost = selectedCity.cost;
  const total = subtotal + shippingCost;

  const formatPrice = (price) => {
    return `${price?.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} د.ع`;
  };

  const getProductDetails = (item) => {
    return products.find(p => p.id === item.id) || {};
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">سەبەتەی کڕین</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200">کاڵاکانی سەبەتەکەت</h2>

                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="mb-4 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg mb-6">سەبەتەکەت بەتاڵە</p>
                    <button onClick={() => navigate("/products")} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-200">
                     بازار بکە
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => {
                      const product = getProductDetails(item);
                      if (!product) return null;

                      return (
                        <div key={item.id} className="flex items-center py-4 border-b border-gray-100 hover:bg-gray-50 px-2 rounded-lg transition">
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2">
                            <img src={product.cardimg} alt={product.title} className="object-contain w-full h-full" />
                          </div>

                          <div className="flex-grow mr-6">
                            <h3 className="font-medium text-lg text-gray-800">{product.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center text-green-600 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                بەردەستە
                              </span>
                            </div>

                            <div className="flex items-center mt-4">
                              <button
                                className=" text-red-600 hover:text-red-800 text-sm flex items-center"
                                onClick={() => removeItem(item.id)}
                              >
                                سڕینەوە
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <p className="font-bold text-lg text-gray-900">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-between items-center mt-6 text-lg font-bold bg-gray-50 p-4 rounded-lg">
                      <span className="text-gray-800">{formatPrice(subtotal)}</span>
                      <span>کۆی گشتی بەرهەمەکان:</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200">پوختەی داواکاری</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">شوێنەکەت دیاری بکە</label>
                  <div className="relative">
                    <select
                      value={selectedCity.name}
                      onChange={handleCityChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      {cities.map(city => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2">
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                    <span className="text-gray-600">کۆی گشتی بەرهەمەکان</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="font-medium">{formatPrice(shippingCost)}</span>
                    <span className="text-gray-600">نرخی گەیاندن بۆ {selectedCity.name}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-xl">
                      <span className="text-gray-900">{formatPrice(total)}</span>
                      <span>کۆی گشتی</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center bg-gray-50 p-3 rounded-lg">
                  ئەم پەڕەیە تەنها بۆ نیشاندانی زانیاریەکانە، هیچ پارەدانێک ئەنجام نادرێت
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AmazonStyleCheckout;