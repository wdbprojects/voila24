import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/layout/AdminHeader";
import Footer from "@/components/layout/Footer";
//import MetaData from "@/components/comps/MetaData";
import { Toaster } from "react-hot-toast";

const AdminBase = () => {
  class NewClass {
    constructor() {
      this.state = {
        showToast: false,
      };
    }
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              color: "rgb(30, 70, 32)",
              fontWeight: 300,
              fontSize: "0.9rem",
              background: "rgb(237, 247, 237)",
              borderRadius: "4px",
            },
          },
          error: {
            style: {
              color: "#5F2120",
              fontWeight: 300,
              fontSize: "0.9rem",
              background: "rgb(253, 237, 237)",
              borderRadius: "4px",
            },
          },
        }}
      />
      <div>
        <AdminHeader />
      </div>
      <main className="flex-auto bg-[#fafafa] dark:bg-black">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default AdminBase;
