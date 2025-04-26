import { Instagram } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';
import Nav from '../components/myComponents/ui/Nav';
import Footer from '../components/myComponents/ui/Footer';

export default function SimpleKurdishDeliveryPage() {
  const cities = [
    { name: "سلێمانی", price: 3000 },
    { name: "هەولێر", price: 4250 },
    { name: "دهۆک", price: 4250 },
    { name: "کەرکوک", price: 4250 },
    { name: "هەڵەبجە", price: 4250 },
    { name: "زاخۆ", price: 4250 },
    { name: "کۆیە", price: 4500 },
    { name: "ڕانیە", price: 4500 },
    { name: "چەمچەماڵ", price: 4500 },
    { name: "سۆران", price: 4500 },
    { name: "شەقڵاوە", price: 4500 }
  ];

  return (
   <div>
    <Nav />
     <div className="max-w-4xl my-12 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#b29ce4] text-white p-6 text-center">
        <h1 className="text-3xl font-bold" style={{ direction: "rtl" }}>کرێی گەیاندن</h1>
        <p className="mt-2 font-bold" style={{ direction: "rtl" }}>کاتی گەیاندن : 1-3 ڕۆژ</p>
      </div>
      
      <div className="p-6" style={{ direction: "rtl" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cities.map((city, index) => (
            <div key={index} className="flex justify-between items-center p-3 border-b">
              <span className="font-bold text-lg">{city.name}</span>
              <span className="text-gray-600 font-medium">{city.price} دینار</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 flex justify-between items-center" style={{ direction: "rtl" }}>
        <div>
          <h2 className="font-bold text-lg">پەیوەندیمان پێوە بکەن</h2>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://www.instagram.com/dazhir.store/" 
            target="_blank"
            rel="noopener noreferrer" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a 
            href="https://www.tiktok.com/@dazhir.store" 
            target="_blank"
            rel="noopener noreferrer" 
            className="bg-black text-white p-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <FaTiktok className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
    <Footer />
   </div>
  );
}