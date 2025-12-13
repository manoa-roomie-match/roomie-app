import { Ratings } from '@prisma/client';
import { FaStar } from 'react-icons/fa';
import { ratingToNumber } from './utilityFunctions';

const renderStars = (rating: Ratings, size = 14, userRating?: Ratings) => {
  const numRating = ratingToNumber(rating);
  const studentRating = userRating ? ratingToNumber(userRating) : null;
  return (
    <div
      className="d-flex align-items-center gap-1"
      style={
        studentRating === numRating
          ? {
            backgroundColor: 'rgb(25,135,84)',
            border: '2px solid rgb(25,135,84)',
            borderRadius: '4px',
            padding: '2px 6px',
          }
          : undefined
        }
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <FaStar
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={i < numRating ? 'text-warning' : 'text-muted'}
          size={size}
        />
      ))}
    </div>
  );
};

export default renderStars;
