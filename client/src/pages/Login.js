import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bgImage from "../images/bgIMG1.jpg";
import { loginfunction } from "../services/auth";
import { toast,} from "react-toastify";
import GlobalContext from "../utils/GlobalContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {  dispatch } = useContext(GlobalContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginfunction(formData);
      console.log(response, "response");

      if (response.status >= 200 && response.status < 300) {
        toast.success("Login successful!");


        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));


        dispatch({ type: "LOGIN", payload: response.data });

        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      toast.error(err.message || "There is some issue.");
    }
  };

  return (
    <div
      className="min-h-[86.5vh] flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-30 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-yellow-500 py-2 rounded-lg font-bold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xl">
          New to TripEase.{" "}
          <Link className="text-yellow-500" to="/signup">
            <span>Click here</span>
          </Link>
          to Sign Up.
        </p>
      </div>
    </div>
  );
};

export default Login;
