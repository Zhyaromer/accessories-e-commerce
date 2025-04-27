import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AmazonStyleCheckout = () => {
  const cities = [
    { name: 'هەولێر', cost: 5000 },
    { name: 'سلێمانی', cost: 7000 },
    { name: 'دهۆک', cost: 8000 },
    { name: 'کەرکوک', cost: 10000 },
    { name: 'هەڵەبجە', cost: 12000 },
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
    return `${price?.toLocaleString()} د.ع`;
  };

  const getProductDetails = (item) => {
    return products.find(p => p.id === item.id) || {};
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">سەبەتەی کڕین</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">کاڵاکانی سەبەتەکەت</h2>

              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 text-lg">سەبەتەکەت بەتاڵە</p>
                </div>
              ) : (
                <div>
                  {cart.map(item => {
                    const product = getProductDetails(item);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex py-4 border-b">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img src={product.cardimg} alt={product.title} className="object-contain w-full h-full" />
                        </div>

                        <div className="flex-grow mr-4">
                          <h3 className="font-medium text-lg">{product.title}</h3>
                          <p className="text-green-600 text-sm mb-2">بەردەستە</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>

                          <div className="flex items-center mt-2">
                            <button
                              className="mr-4 text-blue-600 hover:text-blue-800 text-sm"
                              onClick={() => removeItem(item.id)}
                            >
                              سڕینەوە
                            </button>
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <p className="font-bold">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-right mt-4 text-lg font-bold">
                    کۆی گشتی بەرهەمەکان: {formatPrice(subtotal)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">پوختەی داواکاری</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">شار بۆ گەیاندن:</label>
                <select
                  value={selectedCity.name}
                  onChange={handleCityChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>{formatPrice(subtotal)}</span>
                  <span className="text-gray-600">کۆی گشتی بەرهەمەکان</span>
                </div>

                <div className="flex justify-between">
                  <span>{formatPrice(shippingCost)}</span>
                  <span className="text-gray-600">نرخی گەیاندن بۆ {selectedCity.name}</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{formatPrice(total)}</span>
                    <span>کۆی گشتی</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                ئەم پەڕەیە تەنها بۆ نیشاندانی زانیاریەکانە، هیچ پارەدانێک ئەنجام نادرێت
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonStyleCheckout;