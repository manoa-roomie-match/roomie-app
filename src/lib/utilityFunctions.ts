import { Ratings } from '@prisma/client';

export const ratingToNumber = (rating: Ratings): number => {
  const map: Record<Ratings, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  return map[rating] ?? 3;
};

export const deriveRoommateType = (cleanliness: Ratings, noiseLevels: Ratings) => {
  const clean = ratingToNumber(cleanliness);
  const noise = ratingToNumber(noiseLevels);
  if (clean >= 4 && noise <= 2) return 'Quiet & Tidy';
  if (clean >= 4 && noise >= 4) return 'Social & Clean';
  if (clean <= 2 && noise >= 4) return 'Laid-back & Loud';
  if (clean <= 2 && noise <= 2) return 'Chill & Low-Key';
  return 'Balanced';
};