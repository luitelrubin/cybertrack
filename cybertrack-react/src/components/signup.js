import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [post, setPost] = useState("");
  const [posted_district, setPostedDistrict] = useState("");
  const [batch_No, setBatchNo] = useState("");
  const [official_id, setOfficialId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Create user object
    const userInfo = {
      name: fullName,
      phone: phoneNumber,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      post: post,
      posted_district: posted_district,
      batch_no: 2024,
      official_id: email,
    };

    // Store user data in local storage
    // localStorage.setItem('user', JSON.stringify(userInfo));
    try {
      setLoading(true); // Set loading to true while the request is being made
      // console.log(userInfo);
      // Send POST request to Django backend API
      const response = await axios.post(
        "http://127.0.0.1:8000/account/register/",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response (you can store JWT or session if needed)
      if (response.status === 201) {
        // localStorage.setItem("user", JSON.stringify(userInfo)); // You can store the user data or JWT token if the backend returns it
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError("Registration failed. Please try again."); // Handle error
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register User
        </h1>

        <form onSubmit={handleRegister} className="mt-6">
          {/* Full Name Input */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-800"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-800"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
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

          {/* Batch Number Input */}
          <div className="mb-4">
            <label
              htmlFor="batch_No"
              className="block text-sm font-medium text-gray-800"
            >
              Batch Number
            </label>
            <input
              type="text"
              id="batch_No"
              value={batch_No}
              onChange={(e) => setBatchNo(e.target.value)}
              placeholder="Enter your batch number"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />
          </div>
          {/* Post Input */}
          <div className="mb-4">
            <label
              htmlFor="post"
              className="block text-sm font-medium text-gray-800"
            >
              Post
            </label>
            <input
              type="text"
              id="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Enter your post"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />
          </div>
          {/* posted district Input */}
          <div className="mb-4">
            <label
              htmlFor="posted_district"
              className="block text-sm font-medium text-gray-800"
            >
              Posted District
            </label>
            <input
              type="text"
              id="posted_district"
              value={posted_district}
              onChange={(e) => setPostedDistrict(e.target.value)}
              placeholder="Enter your posted district"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />
          </div>
          {/* official id Input */}
          <div className="mb-4">
            <label
              htmlFor="official_id"
              className="block text-sm font-medium text-gray-800"
            >
              Official Id
            </label>
            <input
              type="text"
              id="official_id"
              value={official_id}
              onChange={(e) => setOfficialId(e.target.value)}
              placeholder="Enter your official id"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}