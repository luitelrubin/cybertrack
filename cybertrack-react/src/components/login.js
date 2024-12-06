import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const { auth, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      password: password,
    };
    try {
      setLoading(true); // Set loading to true while the request is being made
      // console.log(userInfo);
      // Send POST request to Django backend API
      const response = await axios.post(
        "http://127.0.0.1:8000/account/login/",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response (you can store JWT or session if needed)
      if (response.status === 200) {
        const { access, refresh } = response.data; // Assuming the backend returns access and refresh tokens
        login(access); // Store the access token in context
        navigate("/home"); // Redirect to home page
      }
    } catch (err) {
      setError("Login failed. Please try again."); // Handle error
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-[#0072C6] flex justify-center items-center">
        <img
          src="/assets/nepal_police.png"
          alt="Nepal Police"
          className="max-w-full object-contain p-4"
          style={{
            width: '236px',
            height: '286px',
            maxHeight: '80vh',
            borderRadius: '8px',
          }}
        />
      </div>

      <div className="w-full md:w-2/3 flex justify-center items-center px-4 py-4 md:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <img
              src={"/assets/trust_nepalpolice.png"}
              alt="Logo"
              className="w-64 mx-auto"
            />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Sign In</h1>
            <p className="text-gray-600 mt-2">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 font-semibold hover:underline">
                Register here
              </a>
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="12345678"
                className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
