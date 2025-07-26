import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  if(!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;