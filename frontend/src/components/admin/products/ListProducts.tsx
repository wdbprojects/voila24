import AdminLayout from "@/components/layout/AdminLayout";
import ProductsTable from "@/components/admin/products/ProductsTable";

const ListProducts = () => {
  return (
    <AdminLayout>
      <h2 className="text-lg mt-2 mb-4 text-center">All Products</h2>
      <ProductsTable />
    </AdminLayout>
  );
};

export default ListProducts;
