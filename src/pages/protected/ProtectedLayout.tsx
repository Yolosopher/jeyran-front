import { Navigate } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import selfStore from "../../store/selfStore";
import HelperLayout from "./HelperLayout";

const ProtectedLayout = () => {
  const { info } = selfStore();

  if (!info) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return (
    <div className="prot-layout">
      <Header />
      <HelperLayout />
    </div>
  );
};
export default ProtectedLayout;
