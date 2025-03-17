import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const BreadcrumbsComp = () => {
  return (
    <Breadcrumbs size="md" color="foreground" className="py-1 px-2">
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/products">Products</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Product</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadcrumbsComp;
