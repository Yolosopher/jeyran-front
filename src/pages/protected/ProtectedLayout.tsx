import { Navigate } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import selfStore from "../../store/selfStore";
import HelperLayout from "./HelperLayout";
import "./style.scss";

const ProtectedLayout = () => {
  const { loggedIn } = selfStore();

  if (!loggedIn) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div className="prot-layout">
      <Header />
      <HelperLayout />
    </div>
  );
};
export default ProtectedLayout;
