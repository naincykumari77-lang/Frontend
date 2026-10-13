const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("fintrack_token");
  const headers = { ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (response.status === 401) {
    localStorage.removeItem("fintrack_token");
    localStorage.removeItem("fintrack_user");
    throw new Error("Your session has expired. Please login again.");
  }
  if (!response.ok) throw new Error(data?.message || data?.error || "Request failed");
  return data;
}

export function saveAuth(data) {
  localStorage.setItem("fintrack_token", data.token);
  localStorage.setItem("fintrack_user", JSON.stringify({ id: data.id, name: data.name, email: data.email, phone: data.phone || "" }));
}
export function getUser() { try { return JSON.parse(localStorage.getItem("fintrack_user")); } catch { return null; } }
export function isLoggedIn() { return !!localStorage.getItem("fintrack_token"); }
export function logout() { localStorage.removeItem("fintrack_token"); localStorage.removeItem("fintrack_user"); }
export function money(value) { return `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`; }
export function dateText(value) { return value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-"; }
export function monthKey(value) { const d = new Date(value); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
export function currentMonthTransactions(transactions) { const now = new Date(); const key = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`; return transactions.filter(t => monthKey(t.transactionDate) === key); }
