import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";
import { apiFetch, saveAuth } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { const data = await apiFetch("/auth/login", { method:"POST", body:JSON.stringify({email,password}) }); saveAuth(data); navigate("/dashboard", {replace:true}); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return <div className="auth-page">
    <AuthSidebar mode="login" />
    <div className="auth-form-wrap"><form className="auth-form" onSubmit={submit}>
      <h1>Login</h1><p className="muted">Use the email and password you registered with.</p>
      {error && <div className="form-error">{error}</div>}
      <label>Email Address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" autoComplete="email" required />
      <label>Password</label><div className="password-field"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required /></div>
      <div className="form-options"><label className="check"><input type="checkbox" defaultChecked /> Remember me</label></div>
      <button className="primary-btn full" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
      <div className="or"><span>Secure account login</span></div>
      <p className="auth-bottom">Don't have an account? <Link to="/register">Sign Up</Link></p>
    </form></div>
  </div>;
}
