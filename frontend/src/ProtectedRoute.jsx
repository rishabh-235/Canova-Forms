import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function ProtectedRoute() {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.user);
  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}
export default ProtectedRoute;



