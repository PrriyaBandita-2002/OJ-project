import React, { useState } from "react";
import {jwtDecode }from "jwt-decode";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = values;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.token) {
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
localStorage.setItem("userId", response.data.user._id);
      // 👇 Decode token to get role
      const decoded = jwtDecode(token);
      const role = decoded.role || decoded.user?.role;

      // 👇 Save role in localStorage too (optional but useful)
      localStorage.setItem("role", role);

      // 👇 Navigate based on role
      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Login failed.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
