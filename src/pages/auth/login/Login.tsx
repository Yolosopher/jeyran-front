import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Head from "./Head";

const Login = () => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(username, password);
  };
  return (
    <>
      <Head />
      <h1>Login</h1>
      <p>Log in to your account</p>
      <form className="auth-form" onSubmit={submitHandler}>
        <input
          type="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <div>
          <p>Don't have an account?</p>
          <Link className="auth-link" to="/auth/register">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};
export default Login;
