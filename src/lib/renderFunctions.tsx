import { ratingToNumber } from "./utilityFunctions";
import { FaStar } from "react-icons/fa";
import { Ratings } from "@prisma/client";

export const renderStars = (rating: Ratings, size = 14) => {
    const numRating = ratingToNumber(rating);
    return (
      <div className="d-flex align-items-center gap-1">
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