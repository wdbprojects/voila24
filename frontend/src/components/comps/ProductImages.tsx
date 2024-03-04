import { useState } from "react";
import defaultImage from "@/assets/images/default_product.png";

const ProductImages = ({ images, name }) => {
  const [mainIndex, setMainIndex] = useState(0);

  return (
    <div className="rounded-sm dark:bg-zinc-800 bg-zinc-200 p-2">
      {/* MAIN IMAGE */}
      <div>
        <img
          src={images.length > 0 ? images[mainIndex].url : defaultImage}
          alt={name}
          className="block w-full h-[450px] object-cover"
        />
      </div>
      {/* THUMBNAILS */}
      <div className="mt-4 flex flex-row gap-4">
        {images &&
          images?.map((image, index) => {
            return (
              <img
                key={index}
                src={image.url}
                alt={name}
                className={`w-[80px] object-cover h-auto cursor-pointer rounded ${
                  image.url === images[mainIndex].url && "activeThumb"
                }`}
                onMouseEnter={() => {
                  setMainIndex(index);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductImages;
