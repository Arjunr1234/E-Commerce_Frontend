import React, { useContext, useEffect, useState } from "react";
import LoginImg from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validations";
import { signInService } from "../services/authServices";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, auth } = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 2000);
      return;
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await signInService(email, password);
        if (response.success) {
          const adminId = response.id;
          login(adminId);
          navigate("/dashboard");
          toast.success("Login success");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img
            src={LoginImg}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-3">
            Welcome Back
          </h1>
          <h2 className="text-lg text-gray-300 text-center mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.email && (
                <p className="text-red-400 mt-1 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.password && (
                <p className="text-red-400 mt-1 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
