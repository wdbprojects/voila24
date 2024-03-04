import AdminLayout from "@/components/layout/AdminLayout";
import DateRangeSales from "@/components/admin/dashboard/DateRangeSales";
import StatChart from "@/components/admin/dashboard/StatChart";
import StatChart2 from "@/components/admin/dashboard/StatChart2";
import SalesStats from "@/components/admin/dashboard/SalesStats";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div>
        <div>
          <DateRangeSales />
        </div>
        <div>
          <SalesStats />
        </div>
        <div>
          <StatChart2 />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
