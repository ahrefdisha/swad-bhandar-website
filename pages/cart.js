import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER } from "../config";
import { supabase } from "../lib/supabaseClient";

export default function Cart() {
  const { items, updateQty, removeItem, total, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  async function handleWhatsAppOrder() {
    setError("");

    if (!customer.name || !customer.phone || !customer.address) {
      setError("Please fill your name, phone, and address first.");
      return;
    }
    if (items.length === 0) return;

    await supabase.from("orders").insert([
      {
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address,
        items: items,
        total: total,
      },
    ]);

    let message = `*New Order - Swad Bhandar*\n\n`;
    message += `*Name:* ${customer.name}\n`;
    message += `*Phone:* ${customer.phone}\n`;
    message += `*Address:* ${customer.address}\n\n`;
    message += `*Items:*\n`;
    items.forEach((item) => {
      message += `- ${item.name} x${item.qty} = Rs.${item.price * item.qty}\n`;
    });
    message += `\n*Total: Rs.${total}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
  }

  return (
    <>
      <Head>
        <title>Your Cart — Swad Bhandar</title>
      </Head>

      <header>
        <nav className="nav">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="Swad Bhandar" width={48} height={48} className="logo-img" />
            Swad Bhandar
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/#products">Products</Link>
          </div>
        </nav>
      </header>

      <div className="cart-page">
        <h2 style={{ marginBottom: 24 }}>Your Cart</h2>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link href="/" className="btn-primary" style={{ marginTop: 20, display: "inline-block" }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ color: "#8a7f70", fontSize: "0.9rem" }}>
                    ₹{item.price} × {item.qty}
                  </div>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button onClick={() => removeItem(item.id)} title="Remove">
                    🗑
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <input
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="Delivery Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                style={{ ...inputStyle, minHeight: 80 }}
              />
            </div>

            {error && <p style={{ color: "#B5432D", marginBottom: 16 }}>{error}</p>}

            <button
              className="btn-primary"
              style={{ width: "100%", border: "none", background: "#25D366", boxShadow: "0 6px 0 #1a9c4a" }}
              onClick={handleWhatsAppOrder}
            >
              📩 Order via WhatsApp — ₹{total}
            </button>
            <p style={{ fontSize: "0.8rem", color: "#8a7f70", textAlign: "center", marginTop: 10 }}>
              Payment will be Cash on Delivery / direct transfer, confirmed with you over WhatsApp.
            </p>
          </>
        )}
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid rgba(43,33,26,0.2)",
  fontFamily: "inherit",
  fontSize: "0.95rem",
};
