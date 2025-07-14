import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const Signup = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    dob: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, username, email, dob, password } = values;

    try {
      const response = await axios.post(
        `https://oj-project-4-3sr4.onrender.com/api/auth/register`,
        { firstname, lastname, username, email, dob, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstname", "lastname", "username", "email", "dob", "password"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field === "dob" ? "Date of Birth" : field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
                name={field}
                id={field}
                value={values[field]}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder={field === "dob" ? "" : `Enter your ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
