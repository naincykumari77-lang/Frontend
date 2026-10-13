import React,{useEffect,useMemo,useState} from "react";
import PageHeader from "../components/PageHeader";
import {apiFetch,money} from "../utils/api";
export default function Reports(){
 const [summary,setSummary]=useState(null),[transactions,setTransactions]=useState([]),[error,setError]=useState("");
 useEffect(()=>{Promise.all([apiFetch("/reports/summary"),apiFetch("/transactions")]).then(([s,t])=>{setSummary(s);setTransactions(t)}).catch(e=>setError(e.message))},[]);
 const months=useMemo(()=>{const result=[];const now=new Date();for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;const expense=transactions.filter(t=>t.type==="EXPENSE"&&t.transactionDate?.startsWith(key)).reduce((s,t)=>s+Number(t.amount),0);result.push({label:d.toLocaleDateString("en-IN",{month:"short"}),value:expense})}return result},[transactions]);
 const max=Math.max(...months.map(m=>m.value),1); const breakdown=Object.entries(summary?.categoryBreakdown||{}).sort((a,b)=>Number(b[1])-Number(a[1]));
 return <div className="content"><PageHeader title="Reports" subtitle="Understand your spending, income and savings patterns."/>{error&&<div className="form-error page-error">{error}</div>}
 <div className="report-grid"><div className="card report-chart"><div className="card-title"><div><h3>Monthly Spending</h3><span>Last 6 months</span></div></div><div className="bar-chart">{months.map(m=><div className="bar-col" key={m.label}><div className="bar" style={{height:`${Math.max(5,m.value/max*100)}%`}}/><span>{m.label}</span></div>)}</div></div>
 <div className="card category-report"><h3>Category Breakdown</h3><div className="donut small"><strong>{money(summary?.expense)}</strong><span>Total</span></div><div className="report-legend">{breakdown.length?breakdown.slice(0,6).map(([k,v])=><div key={k}><i/> {k} {summary?.expense?Math.round(Number(v)/Number(summary.expense)*100):0}%</div>):<div>No expense data yet.</div>}</div></div></div>
 <div className="card insight-report"><h3>Financial Summary</h3><div className="summary-grid"><div><span>Total Income</span><b>{money(summary?.income)}</b></div><div><span>Total Expenses</span><b>{money(summary?.expense)}</b></div><div><span>Total Savings</span><b>{money(summary?.savings)}</b></div><div><span>Savings Rate</span><b>{Number(summary?.savingsRate||0).toFixed(1)}%</b></div></div></div>
 </div>;
}
