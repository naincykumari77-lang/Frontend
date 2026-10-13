import React, {useEffect,useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {getUser,logout} from "../utils/api";
export default function Topbar(){
  const navigate=useNavigate(); const location=useLocation(); const [user,setUser]=useState(getUser());
  useEffect(()=>setUser(getUser()),[location.pathname]);
  const name=user?.name||"User";
  return <header className="topbar"><div className="search-box"><span>⌕</span><input placeholder="Search transactions, categories, or anything..." /></div><div className="top-actions"><button className="icon-btn">♧</button><button className="avatar" onClick={()=>navigate("/profile")}>{name.charAt(0).toUpperCase()}</button><button className="user-name" onClick={()=>navigate("/profile")}>{name}⌄</button></div></header>;
}
