import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { register, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🧠 Validates: proper URL & ends in image extension
  const isValidImageURL = (url) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photo, password } = form;

    // Password validation
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setError("Password must be at least 6 characters, with 1 uppercase & 1 lowercase.");
      return;
    }

    // Image URL validation
    if (!isValidImageURL(photo)) {
      setError("Please provide a valid image link (must start with http/https and end with .jpg, .png, etc.)");
      return;
    }

    setError("");

    try {
      await register(email, password);
      await updateUser(name, photo);
      toast.success("Registered successfully!");
      navigate("/bills");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <fieldset className="space-y-4">
            <div>
              <label className="label block font-semibold">Name</label>
              <input
                type="text"
                required
                placeholder="Your Name"
                className="input input-bordered w-full"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="label block font-semibold">Email</label>
              <input
                type="email"
                required
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="label block font-semibold">Photo URL</label>
              <input
                type="text"
                required
                placeholder="Image Link (e.g., https://.../photo.jpg)"
                className="input input-bordered w-full"
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
            </div>

            <div>
              <label className="label block font-semibold">Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </fieldset>

          <button type="submit" className="btn btn-neutral w-full mt-2">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
