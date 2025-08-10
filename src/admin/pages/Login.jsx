import { useContext, useState } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center text-[#004040] w-full max-w-md mx-auto transition-all duration-500 ease-in-out opacity-0 animate-fadeIn sm:p-6 xs:p-4">
        <h2 className="text-2xl font-semibold text-[#ECBE07] flex items-center justify-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" /> {/* Placeholder for logo icon */}
          Admin Login
        </h2>
        <p className="mt-2 text-sm text-gray-600">Login to Musibau Autoworks Admin panel</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark bg-primary hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:scale-105"
            >
              Sign in
            </button>
          </div>
          <div className="text-sm mt-4">
            <Link to="/admin/forgot-password" className="font-medium text-primary hover:text-yellow-400">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
