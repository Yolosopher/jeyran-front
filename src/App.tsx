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
function App() {
  const { handlePing } = useInitSocket();
  const { info } = socketStore();

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
          <Route path="/play" element={<Play />} />
          {/* <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:username" element={<User />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
