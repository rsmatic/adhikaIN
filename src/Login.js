import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Welcome back! Please login to your account.
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        {message && (
          <div className="p-3 mt-4 text-sm text-center rounded-lg bg-gray-100 text-gray-700 border">
            {message}
          </div>
        )}

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
  Sign up
</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
