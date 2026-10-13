import React from "react";
import {NavLink,useNavigate} from "react-router-dom";
import Logo from "./Logo";
import {logout} from "../utils/api";
const links=[["⌂","Dashboard","/dashboard"],["⇄","Transactions","/transactions"],["▣","Budgets","/budgets"],["◎","Goals","/goals"],["▥","Reports","/reports"],["♙","Profile","/profile"]];
export default function Sidebar(){const navigate=useNavigate();function signOut(){logout();navigate("/login",{replace:true});}return <aside className="sidebar"><Logo light/><div className="sidebar-subtitle">Track • Plan • Grow</div><nav className="side-nav">{links.map(([icon,label,path])=><NavLink key={path} to={path} className={({isActive})=>`side-link ${isActive?"active":""}`}><span className="side-icon">{icon}</span><span>{label}</span></NavLink>)}</nav><button className="logout-link" onClick={signOut}><span>↪</span> Logout</button><div className="sidebar-tip"><div className="tip-leaf">↗</div><strong>Better money habits today.</strong><span>Build a stronger financial future.</span></div></aside>}
