import React from "react";

export default function Progress({ value, color = "green" }) {
  return (
    <div className="progress-track">
      <div className={`progress-fill ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}