import React from "react";

export default function PageHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button className="primary-btn" onClick={onAction}>＋ {action}</button>}
    </div>
  );
}