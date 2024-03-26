import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import AuthLayout from "./pages/auth/AuthLayout";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import Home from "./pages/protected/home/Home";
import Play from "./pages/protected/play/Play";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignal } from "@fortawesome/free-solid-svg-icons";
import socketStore from "./store/socketStore";
import useInitSocket from "./hooks/useInitSocket";
import { useEffect } from "react";
import useEmitter from "./hooks/useEmitter";
import useAuth from "./hooks/useAuth";
import LeaveGame from "./pages/protected/leave-game/LeaveGame";
function App() {
  useInitSocket();
  const { info } = socketStore();
  const { handleRefreshToken } = useAuth();
  const { emitter } = useEmitter();

  const handlePing = () => {
    emitter({
      event: "ping",
      data: "ping",
    });
  };

  useEffect(() => {
    if (info.connected) {
      handlePing();
    }
  }, [info]);

  return (
    <>
      <div className="online-icon" onClick={handlePing}>
        <FontAwesomeIcon
          icon={faSignal}
          color={info.connected ? "#00ff00" : "#f00"}
        />
      </div>
      <Routes>
        {/* auth routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* protected */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/play/leave" element={<LeaveGame />} />
          <Route path="/play/:id" element={<Play />} />
          {/* <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:username" element={<User />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
