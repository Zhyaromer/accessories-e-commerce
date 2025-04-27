import { Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white">
            <div className="w-full overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="text-white fill-current w-full h-12">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
                    <div dir='rtl' className="flex flex-col items-center md:items-start">
                        <div className="flex gap-4 items-center mb-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                                <img className='w-full h-full rounded-full' src="462612318_3683171545327494_3471639554093747325_n.jpg" alt="" />
                            </div>
                            <h2 className="text-2xl font-bold bg-clip-text text-[#b29ce4]">داژیر ستۆر</h2>
                        </div>
                        <p className="text-gray-200 text-center md:text-left mb-4">لە گەڵ ئێمە دنیا بە دیجیتاڵی ببینە و داهاتووی خۆت دروست بکە</p>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-bold mb-4 text-[#b29ce4]">بەستەرە خێراکان</h3>
                        <div className="flex flex-col space-y-2">
                            <a href="/" className="hover:text-[#b29ce4] transition-colors duration-300">سەرەکی</a>
                            <a href="/products" className="hover:text-[#b29ce4] transition-colors duration-300">بەرهەمەکانمان</a>
                            <a href="/delivery" className="hover:text-[#b29ce4] transition-colors duration-300">گەیاندن</a>
                            <a href="/about" className="hover:text-[#b29ce4] transition-colors duration-300">دەربارە</a>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-bold mb-4 text-[#b29ce4]">پەیوەندیمان پێوە بکە</h3>
                        <p className="text-gray-200 mb-4">لە تۆڕە کۆمەڵایەتیەکان لەگەڵمان بە</p>
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/dazhir.store/" className="w-10 h-10 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Instagram size={20} />
                            </a>
                            <a target='_blank' rel="noopener noreferrer" href="https://www.tiktok.com/@dazhir.store" className="w-10 h-10 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                <FaTiktok size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-6 pb-2"></div>

                <div className="flex mb-8 flex-col items-center">
                    <p className="text-gray-200 text-base">© ٢٠٢٥ داژیر ستۆر - هەموو مافەکان پارێزراوە</p>
                </div>

                <div className="bg-[#1a1a1a] w-full text-center text-base text-gray-300">
                    developed by <a href="https://github.com/Zhyaromer" target='_blank' rel="noopener noreferrer" className="text-[#b29ce4] hover:underline">Zhyar omer</a>
                </div>
            </div>
        </footer>
    );
}