import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ light = false }) {
  return (
    <Link className={`brand ${light ? "brand-light" : ""}`} to="/">
      <span className="brand-mark">↗</span>
      <span>FinTrack</span>
    </Link>
  );
}