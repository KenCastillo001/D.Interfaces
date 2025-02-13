import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ estrellas, maxStars = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`w-6 h-6 ${
              starValue <= estrellas ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
