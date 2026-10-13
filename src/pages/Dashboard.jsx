import React,{useEffect,useMemo,useState} from "react";
import {useNavigate} from "react-router-dom";
import StatCard from "../components/StatCard";
import Progress from "../components/Progress";
import {apiFetch,getUser,money,currentMonthTransactions} from "../utils/api";

export default function Dashboard(){
 const navigate=useNavigate(); const [dashboard,setDashboard]=useState(null); const [transactions,setTransactions]=useState([]); const [goals,setGoals]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
 useEffect(()=>{Promise.all([apiFetch("/dashboard"),apiFetch("/transactions"),apiFetch("/goals")]).then(([d,t,g])=>{setDashboard(d);setTransactions(t);setGoals(g)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
 const user=dashboard?.user||getUser(); const monthTx=currentMonthTransactions(transactions);
 const monthExpense=monthTx.filter(t=>t.type==="EXPENSE").reduce((s,t)=>s+Number(t.amount),0); const monthIncome=monthTx.filter(t=>t.type==="INCOME").reduce((s,t)=>s+Number(t.amount),0);
 const breakdown=useMemo(()=>{const m={}; monthTx.filter(t=>t.type==="EXPENSE").forEach(t=>m[t.category]=(m[t.category]||0)+Number(t.amount)); return Object.entries(m).sort((a,b)=>b[1]-a[1]);},[monthTx]);
 if(loading)return <div className="content"><div className="loading-card">Loading your financial dashboard...</div></div>;
 if(error)return <div className="content"><div className="form-error">{error}</div></div>;
 const goal=goals[0]; const goalPct=goal?Math.min(100,Math.round(Number(goal.currentAmount)/Number(goal.targetAmount)*100)):0;
 return <div className="content">
  <div className="dashboard-head"><div><h1>Welcome, {user?.name||"User"} 👋</h1><p>Here's your financial overview for this month.</p></div><div className="head-actions"><span>{new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</span></div></div>
  <div className="stat-grid"><StatCard icon="▣" title="Total Balance" value={money(dashboard?.totalBalance)} change="Current balance"/><StatCard icon="↗" title="This Month Income" value={money(monthIncome)} change="Income recorded" tone="blue"/><StatCard icon="⌁" title="This Month Expenses" value={money(monthExpense)} change="Expenses recorded" tone="red"/><StatCard icon="♧" title="Total Savings" value={money(dashboard?.totalSavings)} change="Income minus expenses" tone="purple"/></div>
  <div className="dashboard-grid top-grid">
   <div className="card chart-card"><div className="card-title"><div><h3>Expense Overview</h3><span>This month</span></div><button className="text-btn" onClick={()=>navigate("/reports")}>View Reports</button></div><div className="donut-wrap"><div className="donut" style={{background:breakdown.length?`conic-gradient(#377ff2 0 35%,#55bd7a 35% 55%,#f29d4b 55% 70%,#8c5de4 70% 82%,#ee5995 82% 92%,#c9d0d2 92%)`:undefined}}><strong>{money(monthExpense)}</strong><span>This Month</span></div><div className="legend">{breakdown.length?breakdown.slice(0,6).map(([cat,val])=><div key={cat}><i/> {cat} {monthExpense?Math.round(val/monthExpense*100):0}%</div>):<div>No expenses recorded yet.</div>}</div></div></div>
   <div className="card recent-card"><div className="card-title"><h3>Recent Transactions</h3><button className="text-btn" onClick={()=>navigate("/transactions")}>View All</button></div>{transactions.length?transactions.slice(0,6).map(t=><div className="transaction-row" key={t.id}><span className="tx-icon">{t.type==="INCOME"?"↗":"₹"}</span><div><strong>{t.description}</strong><small>{t.category}</small></div><b className={t.type==="INCOME"?"income":"expense"}>{t.type==="INCOME"?"+":"-"} {money(t.amount)}</b></div>):<div className="empty-state">No transactions yet. Add your first income or expense.</div>}</div>
  </div>
  <div className="card goal-banner"><div className="goal-symbol">✈</div><div>{goal?<><strong>Next Goal: {goal.name}</strong><span>{money(goal.currentAmount)} / {money(goal.targetAmount)}</span><Progress value={goalPct}/></>:<><strong>Start your first financial goal</strong><span>Create a savings goal and track your progress.</span></>}</div><button className="dark-btn" onClick={()=>navigate(goal?"/goals":"/goals")}>{goal?"View Goals":"Add Goal"}</button></div>
 </div>;
}
