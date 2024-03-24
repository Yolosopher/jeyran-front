import { Navigate, Outlet } from "react-router-dom";
import selfStore from "../../store/selfStore";
import "./auth.scss";

const AuthLayout = () => {
  const { loggedIn } = selfStore();

  if (loggedIn) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="auth-main">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
