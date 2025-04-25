import {  Instagram, Facebook, Twitter} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">LUXE ACCESSORIES</h3>
                        <p className="mb-4">Premium accessories for the modern individual. Quality, style, and craftsmanship in every piece.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">All Products</a></li>
                            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-white">Sale Items</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white">Track Order</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Our Story</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2025 LUXE ACCESSORIES. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;