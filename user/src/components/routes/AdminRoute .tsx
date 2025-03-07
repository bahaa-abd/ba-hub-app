import { Role } from "constants/enums";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const role = localStorage.getItem("role") as Role;
  if (role === Role.admin) {
    return <Outlet />;
  }
  return <Navigate to="/my-organizations" />;
};
export default AdminRoute;
