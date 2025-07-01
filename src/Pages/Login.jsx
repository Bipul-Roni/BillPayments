import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, pass);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login success!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 px-4 ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <fieldset className="space-y-4">
            <label className="label block font-semibold">Email</label>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="label block font-semibold">Password</label>
            <input
              type="password"
              required
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="input input-bordered w-full"
            />

            <div className="text-right">
              <Link
                to="/forget-password"
                className="link link-hover text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-neutral w-full mt-2"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register here
          </Link>
        </p>

        <div className="text-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="text-black border flex justify-center items-center gap-3 w-full px-6 py-2 rounded hover:bg-blue-200 transition"
          >
            <FcGoogle size={20} />Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
