import OrdersTable from "@/components/orders/OrdersTable";
import UserLayout from "../layout/UserLayout";

const MyOrders = () => {
  return (
    <UserLayout>
      <OrdersTable />
    </UserLayout>
  );
};

export default MyOrders;
