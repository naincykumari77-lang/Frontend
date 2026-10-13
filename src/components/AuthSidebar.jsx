import React from "react";
import Logo from "./Logo";

export default function AuthSidebar({ mode = "login" }) {
  const isRegister = mode === "register";
  return (
    <aside className={`auth-panel auth-sidebar ${isRegister ? "auth-sidebar-register" : ""}`}>
      <Logo light />
      <div className="auth-copy auth-sidebar-copy">
        <div className="auth-eyebrow"><span className="eyebrow-dot" /> YOUR MONEY, IN YOUR CONTROL</div>
        <h2>{isRegister ? <>Start building<br/>your wealth.</> : <>Welcome back to<br/>better finances.</>}</h2>
        <p>{isRegister ? "One simple place to track spending, plan ahead, and make every rupee count." : "Your financial picture, goals, and everyday decisions — all in one calm, clear space."}</p>
        <div className="finance-art" aria-hidden="true">
          <div className="art-glow" />
          <div className="art-card art-card-back"><span>Monthly savings</span><b>+18.6%</b><i>↗</i></div>
          <div className="art-card art-card-front"><div className="art-card-top"><span>FINTRACK WALLET</span><span className="art-chip">▦</span></div><strong>₹ 84,650<span>.00</span></strong><small>Available balance overview</small><div className="art-card-bottom"><i>● ● ● ●</i><b>•••• 2048</b></div></div>
          <div className="art-chart"><span/><span/><span/><span/><span/><span/><span/><span/></div>
          <div className="art-coin">₹</div><div className="art-sparkle sparkle-one">✦</div><div className="art-sparkle sparkle-two">✧</div>
        </div>
        <ul className="auth-benefits">
          <li><span>✓</span><div><b>See the full picture</b><small>Income, expenses and balance in one view</small></div></li>
          <li><span>✓</span><div><b>Plan with confidence</b><small>Budgets and goals that keep you on track</small></div></li>
          <li><span>✓</span><div><b>Private by design</b><small>Your records stay connected to your account</small></div></li>
        </ul>
        <div className="auth-sidebar-footer"><span className="footer-shield">✓</span> A clearer view of your financial future</div>
      </div>
    </aside>
  );
}
