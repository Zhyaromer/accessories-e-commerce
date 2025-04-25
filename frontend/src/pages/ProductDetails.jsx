import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/products/getbyid/${id}`);
                if (res.status === 200) {
                    setProduct(res.data);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setProduct([]);
            }
        }

        fetchProduct();
    }, [id]);

    const nextImage = () => {
        if (product && product.images && product.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (product && product.images && product.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
            );
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-b29ce4">Home</a> /
                    <a href="/products" className="hover:text-b29ce4 mx-1">{product.category}</a> /
                    <span className="text-gray-700">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <div className="aspect-w-3 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 mb-4">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[currentImageIndex].imgURL}
                                    alt={product.title}
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                            {product.images && product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}

                            {product.isDiscounted === 1 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                                    {Math.round((1 - product.discount_price / product.price) * 100)}% OFF
                                </div>
                            )}
                        </div>

                        {product?.images?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {product?.images?.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 rounded border-2 flex-shrink-0 ${index === currentImageIndex
                                            ? 'border-b29ce4'
                                            : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image?.imgURL}
                                            alt={`${product.title} thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>

                            <div className="flex items-center">
                                {product.isDiscounted === 1 ? (
                                    <>
                                        <span className="text-2xl font-bold text-red-600 mr-2">
                                            IQD {(product?.discount_price?.toFixed(3))}
                                        </span>
                                        <span className="text-lg text-gray-500 line-through">
                                            IQD {(product?.price?.toFixed(3))}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-gray-900">
                                        IQD {(product?.price?.toFixed(3))}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="font-lg md:text-xl mr-2">Category:</span>
                                <span className="font-lg md:text-xl">{product.category}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="font-lg md:text-xl mr-2">Availability:</span>
                                <span className={product.isSoldOut === 1 ? "font-lg md:text-xl text-red-500" : "font-lg md:text-xl text-green-500"}>
                                    {product.isSoldOut === 1 ? "Out of Stock" : "In Stock"}
                                </span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="font-lg md:text-xl mr-2">stock:</span>
                                <span className='font-lg md:text-xl'>
                                    دانە {product.stock}
                                </span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="font-lg md:text-xl mr-2">Color :</span>
                                <div className="flex space-x-1">
                                    <div
                                        className="w-4 h-4 md:w-3 md:h-3 rounded-full border border-gray-200"
                                        style={{ backgroundColor: product?.color?.toLowerCase() }}
                                        title={product.color}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <button
                                disabled={product.isSoldOut === 1}
                                className={`flex-1 flex bg-purple-600 items-center justify-center gap-2 px-6 py-3 rounded font-medium ${product.isSoldOut === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-b29ce4 text-white hover:bg-purple-700'
                                    }`}
                            >
                                <ShoppingBag size={18} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;