import { Navigate } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import selfStore from "../../store/selfStore";
import HelperLayout from "./HelperLayout";
import { useEffect } from "react";
import useInitSocket from "../../hooks/useInitSocket";
import useEmitter from "../../hooks/useEmitter";

const ProtectedLayout = () => {
  const { loggedIn } = selfStore();
  const { emitter } = useEmitter();

  const handlePing = () => {
    emitter({
      event: "ping",
    });
  };

  useEffect(() => {
    if (loggedIn) {
      handlePing();
    }
  }, []);

  if (!loggedIn) {
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
