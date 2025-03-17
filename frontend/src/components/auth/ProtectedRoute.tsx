import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../comps/Loader";

const ProtectedRoute = ({ admin, children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => {
    return state.auth;
  });

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
