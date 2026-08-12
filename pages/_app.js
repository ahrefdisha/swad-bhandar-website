import { useEffect } from "react";
import { CartProvider } from "../context/CartContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const snacks = ["🍪", "🍯", "🥜", "🍡"];
    let lastSpawn = 0;

    function handleMouseMove(e) {
      const now = Date.now();
      if (now - lastSpawn < 40) return; // throttle so it's not overwhelming
      lastSpawn = now;

      for (let i = 0; i < 2; i++) {
        const el = document.createElement("span");
        el.textContent = snacks[Math.floor(Math.random() * snacks.length)];
        el.className = "falling-snack";
        el.style.left = `${e.clientX - 10 + (Math.random() * 20 - 10)}px`;
        el.style.top = `${e.clientY - 10 + (Math.random() * 20 - 10)}px`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
