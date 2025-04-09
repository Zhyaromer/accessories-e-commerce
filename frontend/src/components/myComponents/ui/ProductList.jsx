import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Products</h2> */}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
