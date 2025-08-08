import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Review from '../components/Review';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('/api/cart', { productId: id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-gray-500">{product.category}</p>
          <p>{product.description}</p>
          <button onClick={handleAddToCart} className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
      <Review productId={id} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        {product.reviews.map(review => (
          <div key={review._id} className="border-b py-2">
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">By {review.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;