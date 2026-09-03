import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

// Simple password protection - change this to your own secret code
const ADMIN_PASSWORD = "swad2026";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data);
    setLoading(false);
  }

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  }

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>Admin Login — Swad Bhandar</title>
        </Head>
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
          <h2 style={{ marginBottom: 16 }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: 12,
              background: "#1F3D2B",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Orders — Swad Bhandar Admin</title>
      </Head>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1>Orders ({orders.length})</h1>
          <Link href="/" style={{ color: "#B5432D" }}>Back to site</Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#FBF6EA",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>{order.customer_name}</strong>
                <span style={{ color: "#8a7f70", fontSize: "0.85rem" }}>
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", marginBottom: 4 }}>Phone: {order.customer_phone}</p>
              <p style={{ fontSize: "0.9rem", marginBottom: 12 }}>Address: {order.customer_address}</p>
              <div style={{ fontSize: "0.9rem", marginBottom: 12 }}>
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.name} x{item.qty} = Rs.{item.price * item.qty}
                  </div>
                ))}
              </div>
              <strong style={{ color: "#B5432D" }}>Total: Rs.{order.total}</strong>
            </div>
          ))
        )}
      </div>
    </>
  );
}
