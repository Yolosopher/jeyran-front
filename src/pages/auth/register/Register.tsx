import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import request from "../../../request";
import Head from "./Head";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await request({
        path: "/auth/register",
        method: "POST",
        payload: { username, password },
      });
      if (result.success) {
        toast("Account created successfully!", { icon: "🚀" });

        // Redirect to login page
        navigate(`/auth/login?username=${username}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast(error.message, { icon: "🔥" });
    }
  };
  return (
    <>
      <Head />
      <h1>Register</h1>
      <p>Create a new account</p>
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

        <button type="submit">Join</button>
        <div>
          <p>Already have an account?</p>
          <Link className="auth-link" to="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};
export default Register;
