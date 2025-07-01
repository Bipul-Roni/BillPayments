import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // New state for showing under-form message
  const { resetPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
      setMessage(
        "A password reset email has been sent. Please check your inbox."
      ); // Set message here
      setEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
      setMessage(""); // Clear any previous message
    }
  };

  return (
    <div>
      <Helmet>
        <title>Bill Details</title>
      </Helmet>

      <div className="flex justify-center mt-20 px-4">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="label block font-semibold">
              Enter your email
            </label>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-neutral w-full mt-2">
              Send Reset Email
            </button>
          </form>

          {/* Message under form */}
          {message && (
            <p className="mt-4 text-red-600 font-medium text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
