import React from 'react'
import { useState, useEffect } from 'react';
import { Home, Truck, Menu, X, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart).length : 0;
    });

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = localStorage.getItem("cart");
            setCartItemCount(storedCart ? JSON.parse(storedCart).length : 0);
        };

        window.addEventListener('storage', updateCartCount);

        window.addEventListener('cartUpdated', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-[#b29ce4] text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div onClick={() => navigate("/")} className="flex items-start justify-center space-x-2 cursor-pointer">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src="/462612318_3683171545327494_3471639554093747325_n.jpg" alt="" />
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight text-white">داژیر</span>
                        </div>
                    </div>

                    <div dir='rtl' className="hidden md:flex items-center gap-8 rtl:space-x-reverse font-bold">
                        <a href="/" className="flex gap-2 items-center space-x-1 rtl:space-x-reverse hover:text-[hsl(0,9%,89%)] transition duration-150">
                            <span>سەرەکی</span>
                            <Home size={18} />
                        </a>
                        <a href="/products" className="flex gap-2 items-center space-x-1 rtl:space-x-reverse hover:text-[hsl(0,9%,89%)] transition duration-150">
                            <span>بەرهەمەکانمان</span>
                            <ShoppingBag size={18} />
                        </a>
                        <a href="/delivery" className="flex gap-2 items-center space-x-1 rtl:space-x-reverse hover:text-[hsl(0,9%,89%)] transition duration-150">
                            <span>گەیاندن</span>
                            <Truck size={18} />
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={() => navigate("/checkout")} className="p-2 rounded-full hover:bg-[hsl(258,57%,80%)] transition duration-150 cursor-pointer relative">
                            <ShoppingCart size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="flex md:hidden p-2 rounded-full hover:bg-[hsl(258,57%,80%)] transition duration-150 relative"
                    >
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden bg-[#b29ce4] shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col space-y-3 text-right">
                        <a href="/" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-[hsl(258,57%,80%)] rounded-lg transition duration-150">
                            <span>سەرەکی</span>
                            <Home size={18} />
                        </a>
                        <a href="/products" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-[hsl(258,57%,80%)] rounded-lg transition duration-150">
                            <span>کەلوپەل</span>
                            <ShoppingBag size={18} />
                        </a>
                        <a href="/delivery" className="flex items-center justify-end space-x-2 rtl:space-x-reverse py-2 px-3 hover:bg-[hsl(258,57%,80%)] rounded-lg transition duration-150">
                            <span>گەیاندن</span>
                            <Truck size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
