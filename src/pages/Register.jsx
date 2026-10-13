import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";
import { apiFetch, saveAuth } from "../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const [form,setForm]=useState({name:"",email:"",phone:"",password:"",confirmPassword:""});
  const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  async function submit(e){
    e.preventDefault(); setError("");
    if(form.password!==form.confirmPassword){setError("Passwords do not match.");return;}
    if(form.password.length<6){setError("Password must contain at least 6 characters.");return;}
    setLoading(true);
    try { const data=await apiFetch("/auth/register",{method:"POST",body:JSON.stringify({name:form.name,email:form.email,phone:form.phone,password:form.password})}); saveAuth(data); navigate("/dashboard",{replace:true}); }
    catch(err){setError(err.message);} finally{setLoading(false);}
  }
  return <div className="auth-page">
    <AuthSidebar mode="register" />
    <div className="auth-form-wrap"><form className="auth-form" onSubmit={submit}>
      <h1>Sign Up</h1><p className="muted">Create your personal FinTrack account.</p>
      {error && <div className="form-error">{error}</div>}
      <label>Full Name</label><input name="name" value={form.name} onChange={update} placeholder="Enter your full name" required />
      <label>Email Address</label><input name="email" type="email" value={form.email} onChange={update} placeholder="Enter your email" autoComplete="email" required />
      <label>Phone Number</label><input name="phone" value={form.phone} onChange={update} placeholder="Enter your phone number" autoComplete="tel" />
      <label>Password</label><input name="password" type="password" value={form.password} onChange={update} placeholder="At least 6 characters" autoComplete="new-password" required />
      <label>Confirm Password</label><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} placeholder="Confirm your password" autoComplete="new-password" required />
      <button className="primary-btn full" disabled={loading}>{loading?"Creating account...":"Create Account"}</button>
      <p className="auth-bottom">Already have an account? <Link to="/login">Login</Link></p>
    </form></div>
  </div>;
}
