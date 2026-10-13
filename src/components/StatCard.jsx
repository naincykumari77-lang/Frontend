import React from "react";

export default function StatCard({ icon, title, value, change, tone = "green" }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        <span className={change?.startsWith("↓") ? "negative" : "positive"}>{change}</span>
      </div>
    </div>
  );
}