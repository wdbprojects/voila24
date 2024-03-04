import { Button, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import notFoundImage from "@/assets/images/404.svg";

const NotFoundPage = () => {
  return (
    <div className="container flex justify-center">
      <div className="block m-16 mx-auto">
        <div>
          <Image
            src={notFoundImage}
            width={400}
            alt="Page not found - 404"
            className="m-5"
            isBlurred
          />
        </div>
        <div className="flex justify-center items-center">
          <span className="mr-2 text-sm">Page not found. Go to: </span>
          <Button size="sm" color="default" variant="solid" className="text-sm">
            <Link to="/">Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
