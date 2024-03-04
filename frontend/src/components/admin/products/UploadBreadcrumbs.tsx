import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const UploadBreadcrumbs = ({ productName }) => {
  return (
    <Breadcrumbs size="md" color="foreground" className="py-1 px-2">
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/admin/products">Product List</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>{productName}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default UploadBreadcrumbs;
