import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-blue-200 tracking-wider">Login</h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-500 dark:hover:from-blue-800 dark:hover:to-blue-600 transition font-semibold shadow-lg"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-blue-200">
            Need an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-white">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
