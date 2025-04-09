import React from 'react'
import { useState } from 'react';
import { Home, Truck, Info, Menu, X, ShoppingCart, ShoppingBag} from 'lucide-react';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-[#b29ce4] text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-start justify-center space-x-2">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src="462612318_3683171545327494_3471639554093747325_n.jpg" alt="" />
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight text-white">داژیر</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse font-bold">
                        <a href="#" className="flex items-center space-x-1 rtl:space-x-reverse hover:text-indigo-200 transition duration-150">
                            <Home size={18} />
                            <span>سەرەکی</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 rtl:space-x-reverse hover:text-indigo-200 transition duration-150">
                            <ShoppingBag size={18} />
                            <span>کەلوپەل</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 rtl:space-x-reverse hover:text-indigo-200 transition duration-150">
                            <Truck size={18} />
                            <span>گەیاندن</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 rtl:space-x-reverse hover:text-indigo-200 transition duration-150">
                            <Info size={18} />
                            <span>دەربارەی ئێمە</span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <button className="p-2 rounded-full hover:bg-indigo-700 transition duration-150">
                            <ShoppingCart size={20} />
                        </button>
                    </div>

                    <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
                        <button className="p-2 rounded-full hover:bg-indigo-700 transition duration-150">
                            <ShoppingCart size={20} />
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-full hover:bg-indigo-700 transition duration-300"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden bg-indigo-700 shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col space-y-3 text-right">
                        <a href="#" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-indigo-600 rounded-lg transition duration-150">
                            <span>سەرەکی</span>
                            <Home size={18} />
                        </a>
                        <a href="#" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-indigo-600 rounded-lg transition duration-150">
                            <span>کەلوپەل</span>
                            <ShoppingBag size={18} />
                        </a>
                        <a href="#" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-indigo-600 rounded-lg transition duration-150">
                            <span>گەیاندن</span>
                            <Truck size={18} />
                        </a>
                        <a href="#" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-indigo-600 rounded-lg transition duration-150">
                            <span>دەربارەی ئێمە</span>
                            <Info size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
