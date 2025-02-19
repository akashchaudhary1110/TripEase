import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../images/heroIMG5.jpg";
import { toast } from "react-toastify";
import { signUpFunction } from "../services/auth";


const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        toast.error("password do not match");
        return;
      }
      try {
        const response = await signUpFunction(formData);
        console.log(response,"response of the signup");
        
        if (response.status>199 && response.status<300) {
          toast.success("Signed Up successfully");
          navigate("/login");
        }
      } catch (err) {
        setError("Failed to create an account. Try again.");
        toast.error("Failed to create an account. Try again.")
      }
    };
  
    return (
      <div className="min-h-[86.5vh] flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="bg-white bg-opacity-30 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Sign Up</h2>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white border border-black focus:outline-none" />
            <button type="submit" className="w-full bg-black text-yellow-500 py-2 rounded-lg font-bold hover:bg-gray-900 transition">Sign Up</button>
          </form>
           <p className = "text-center text-xl">
          Already have account?<Link className="text-yellow-500" to="/login">
          
          <span>Click here</span> 
          </Link>to Login.
                  </p>
        </div>
      </div>
    );
  };


  export default Signup; 