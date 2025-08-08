import { useState } from 'react';
import axios from 'axios';

function Review({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', { productId, rating, comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRating(0);
      setComment('');
      alert('Review submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 border rounded w-full"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Review</button>
      </form>
    </div>
  );
}

export default Review;