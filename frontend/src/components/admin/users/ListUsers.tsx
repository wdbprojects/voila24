import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import UsersTable from "@/components/admin/users/UsersTable";

const ListUsers = () => {
  return (
    <AdminLayout>
      <h2 className="text-lg mt-2 mb-4 text-center">All Users</h2>
      <UsersTable />
    </AdminLayout>
  );
};

export default ListUsers;
