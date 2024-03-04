import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const BreadcrumbsAdminOrders = ({ orderNumber }) => {
  return (
    <Breadcrumbs size="md" color="foreground" className="py-1 px-2">
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/admin/orders">Admin Orders</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Order No. {orderNumber}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadcrumbsAdminOrders;
