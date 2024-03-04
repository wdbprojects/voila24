import { useState } from "react";

const Ratings = ({ rating, disabled, size }) => {
  const [starValue, setStarValue] = useState(rating);

  return (
    <div className={`rating rating-${size}`}>
      <form>
        <input
          disabled={disabled}
          type="radio"
          name="rating-1"
          className="mask mask-star bg-yellow-500 cursor-default"
          checked={starValue === 1 ? true : false}
          onChange={() => {
            setStarValue(1);
          }}
        />
        <input
          disabled={disabled}
          type="radio"
          name="rating-1"
          checked={starValue === 2 ? true : false}
          className="mask mask-star bg-yellow-500 cursor-default"
          onChange={() => {
            setStarValue(2);
          }}
        />
        <input
          disabled={disabled}
          type="radio"
          name="rating-1"
          checked={starValue === 3 ? true : false}
          className="mask mask-star bg-yellow-500 cursor-default"
          onChange={() => {
            setStarValue(3);
          }}
        />
        <input
          disabled={disabled}
          type="radio"
          name="rating-1"
          checked={starValue === 4 ? true : false}
          className="mask mask-star bg-yellow-500 cursor-default"
          onChange={() => {
            setStarValue(4);
          }}
        />
        <input
          disabled={disabled}
          type="radio"
          name="rating-1"
          checked={starValue === 5 ? true : false}
          className="mask mask-star bg-yellow-500 cursor-default"
          onChange={() => {
            setStarValue(5);
          }}
        />
      </form>
    </div>
  );
};
export default Ratings;
