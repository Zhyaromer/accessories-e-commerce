import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import ProductList from '../components/myComponents/ui/ProductList';
import axios from 'axios';
import Nav from '../components/myComponents/ui/Nav';
import Footer from '../components/myComponents/ui/Footer';

export default function Main() {
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/products/newest');

        if (res.status === 200) {
          setNewestProducts(res.data);
        }
      } catch (error) {
        setNewestProducts([]);
      }
    }

    fetchNewestProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Nav />
      <div dir='rtl' className="bg-indigo-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pl-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-600 leading-tight mb-6">
                Elevate Your Style with Premium Accessories
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                جوانترین و باشترینەکان لای ئێمە بەردەستە
                بۆ ئەوەی جوانیەکی تەواو بدەیتە ستایلی ڕۆژانەت ئەوا
                داژیر ستۆر هەڵبژێرە
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button type="button" onClick={() => window.location.href = '/products'} className="bg-[hsl(258,57%,60%)] text-white px-4 py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div>
                      <span>بازار بکە</span>
                    </div>
                    <div>
                      <ChevronLeft size={18} fontWeight={"bold"} className="mr-1" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="https://sell.cratejoy.com/wp-content/uploads/2016/08/fashion-815x543.jpg"
                  alt="Luxury accessories collection"
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">بەرهەمە تازەکانمان</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Discover our most popular items loved by customers worldwide. Perfect for every occasion.
            </p>
          </div>

          <ProductList products={newestProducts} />

          <div className="text-center mt-8">
            <a href="/products" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
              <ChevronLeft size={16} className="mr-1" />
              بینینی زیاتر
            </a>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Browse our extensive collection of premium accessories across different categories.
            </p>
          </div>
          <div dir='rtl' className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "کاتژمێر", count: "24 پارچە", image: "https://www.engraversguild.co.uk/wp-content/uploads/2022/11/nurse-watch-mq-landscape-scaled.jpg", link: "http://localhost:5173/products?category=%DA%A9%D8%A7%D8%AA%DA%98%D9%85%DB%8E%D8%B1" },
              { name: "ملوانکە", count: "36 پارچە", image: "https://th.bing.com/th/id/R.a16c5c636f811f25366b6b7d725a307e?rik=VpZ6iVflPqRuHg&riu=http%3a%2f%2fwww.wellfield.th.com%2fimgadmins%2fgallery%2f139866522410K-06.jpg&ehk=78hwBRTSbBHsO%2fePiASiob9m8rKWJIVxcT1p1PPTAhA%3d&risl=&pid=ImgRaw&r=0",link : "http://localhost:5173/products?category=ملوانکە" },
              { name: "دەستبەند", count: "18 پارچە", image: "https://wallpapercave.com/wp/wp2487315.jpg",link : "http://localhost:5173/products?category=دەستبەند" },
            ].map((category, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group">
                <img src={category.image} alt={category.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  <p className="text-gray-300 mb-3">{category.count}</p>
                  <a href={category.link} className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-md inline-block w-max transition-colors">
                    بینینی زیاتر
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}