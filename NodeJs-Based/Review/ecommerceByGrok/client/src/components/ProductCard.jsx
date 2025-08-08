import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <Link to={`/product/${product._id}`} className="mt-2 inline-block bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;