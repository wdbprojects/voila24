import AdminLayout from "@/components/layout/AdminLayout";
import AdminOrdersTable from "./AdminOrdersTable";

const ListAdminOrders = () => {
  return (
    <AdminLayout>
      <h2 className="text-lg mt-2 mb-4 text-center">All Orders</h2>
      <AdminOrdersTable />
    </AdminLayout>
  );
};

export default ListAdminOrders;
