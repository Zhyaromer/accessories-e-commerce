import { ShoppingCart } from 'lucide-react';

const getDiscountPercentage = (original, discounted) => {
  return Math.round(((original - discounted) / original) * 100);
};

const ProductCard = ({ product }) => {
  const colorArray = product.colors ? product.colors.split(',').map(color => color.trim()) : [];

  return (
    <div dir='rtl' onClick={() => window.location.href = `/product/${product.id}`} className={`cursor-pointer rounded-lg overflow-hidden shadow-md ${Boolean(product.isSoldOut) ? 'bg-gray-200' : 'bg-white'} hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative`}>

      {product.discount_price !== null && !Boolean(product.isSoldOut) && (
        <div className="absolute top-0 right-0 bg-red-500 text-white z-10 px-1 py-0.5 md:px-2 md:py-1 font-bold text-xs">
          داشکاندنی %{getDiscountPercentage(product.price, product.discount_price)}
        </div>
      )}

      <div className="relative">
        <img
          src={product.cardimg}
          alt={product.title}
          className={`w-full h-52 object-cover ${Boolean(product.isSoldOut) ? 'opacity-70' : ''}`}
        />
      </div>

      <div className="p-2 md:px-3 md:py-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className={`font-medium text-xs sm:text-sm ${Boolean(product.isSoldOut) ? 'text-gray-600' : 'text-gray-800'} truncate`}>
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 md:mt-1 truncate">{product.category}</p>

          <div className="mt-1 md:mt-2 flex items-center gap-1">
            <span className="text-xs text-gray-600 mr-1 hidden sm:inline">ڕەنگەکان : </span>
            <div className="flex space-x-1">
              {colorArray.length > 0 ? (
                colorArray.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))
              ) : (
                <span className="text-xs text-gray-500">No colors</span>
              )}
              {colorArray.length > 4 && (
                <span className="text-xs text-gray-500">+{colorArray.length - 4}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 md:mt-3">
          <div>
            {Boolean(product.isDiscounted) ? (
              <div className="flex items-center">
                <span className="text-xs text-gray-500 line-through ml-1 xs:inline">
                  IQD {product?.price?.toFixed(3)}
                </span>
                <span className="font-bold text-xs md:text-sm text-red-600">
                  IQD {product.discount_price !== null ? product?.discount_price?.toFixed(2) : ''}
                </span>
              </div>
            ) : (
              <span className={`font-bold text-xs md:text-sm ${Boolean(product.isSoldOut) ? 'text-gray-500' : 'text-gray-800'}`}>
                IQD {product?.price?.toFixed(3)}
              </span>
            )}
          </div>

          <button
            className={`px-1 py-0.5 sm:px-2 sm:py-1 rounded-lg flex items-center justify-center cursor-pointer text-xs ${Boolean(product.isSoldOut)
                ? 'bg-gray-400 text-gray-100 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
            disabled={Boolean(product.isSoldOut)}
          >
            <ShoppingCart size={16} className="mr-0.5 sm:mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;