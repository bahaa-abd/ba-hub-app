import { Role } from "constants/enums";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const role = localStorage.getItem("role") as Role;
  if (role === Role.user) {
    return <Outlet />;
  }
  return <Navigate to="/organizations" />;
};
export default UserRoute;
