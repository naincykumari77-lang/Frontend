import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="landing-actions">
          <button className="ghost-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="primary-btn small" onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">SMART MONEY. SIMPLE LIFE.</span>
          <h1>Take Control<br />of Your Finances</h1>
          <p>Track your spending, save more,<br />reach your goals — all in one place.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/register")}>Get Started Free</button>
            <button className="outline-btn" onClick={() => navigate("/dashboard")}>Watch Demo</button>
          </div>
        </div>

        <div className="hero-art">
          <div className="leaf leaf-a">❯</div>
          <div className="leaf leaf-b">❯</div>
          <div className="phone-art">
            <div className="phone-top">FinTrack <span>•••</span></div>
            <div className="phone-balance">₹42,680</div>
            <div className="mini-chart"><i/><i/><i/><i/><i/><i/><i/></div>
            <div className="phone-row"><span>Income</span><b>₹58,000</b></div>
            <div className="phone-row"><span>Expenses</span><b>₹15,320</b></div>
          </div>
          <div className="coin coin-one">₹</div>
          <div className="coin coin-two">₹</div>
          <div className="plant">⌁</div>
        </div>
      </section>

      <section className="feature-strip" id="features">
        {[
          ["▣", "Track Expenses", "Understand where your money goes"],
          ["◈", "Set Budgets", "Stay on top of your spending limits"],
          ["♧", "Save Smarter", "Build your future goals"],
          ["◉", "Get Insights", "Make better financial decisions"]
        ].map(([i,t,d]) => (
          <div className="feature-item" key={t}>
            <span>{i}</span><strong>{t}</strong><small>{d}</small>
          </div>
        ))}
      </section>

      <section className="steps" id="about">
        <span className="eyebrow">HOW IT WORKS</span>
        <h2>Simple Steps to a Better Financial Future</h2>
        <div className="step-grid">
          {[["1","Sign Up","Create your free account in seconds"],
            ["2","Add Transactions","Track your income & expenses"],
            ["3","Reach Your Goals","Save, invest and grow with confidence"]].map(([n,t,d]) => (
            <div className="step" key={n}><b>{n}</b><strong>{t}</strong><span>{d}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}