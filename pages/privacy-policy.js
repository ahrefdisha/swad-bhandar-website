import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Swaad Bhandar</title>
      </Head>
      <header>
        <nav className="nav">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="Swaad Bhandar" width={48} height={48} className="logo-img" />
            Swad Bhandar
          </Link>
        </nav>
      </header>
      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: July 2026</p>

        <h2>1. Information We Collect</h2>
        <p>When you place an order or write a review on Swaad Bhandar, we collect the following information: your name, phone number, delivery address, and the products you order. If you write a review, we store your name and the review text.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information only to process and deliver your order, communicate with you about your order via WhatsApp, and display reviews on our website. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

        <h2>3. How Your Order Information Is Handled</h2>
        <p>When you place an order, your details (name, phone, address, and order items) are sent as a WhatsApp message directly to us. This information is used solely to fulfill your order.</p>

        <h2>4. Cookies and Local Storage</h2>
        <p>Our website uses your browser's local storage to remember items in your shopping cart. This data stays on your device and is not sent to us until you complete an order.</p>

        <h2>5. Data Storage</h2>
        <p>Reviews submitted on our website are stored securely using Supabase, a third-party database provider. We do not store payment information, as payments are currently handled directly (Cash on Delivery / UPI) and not through our website.</p>

        <h2>6. Your Rights</h2>
        <p>You can request that we delete any review or personal information you've submitted by contacting us on WhatsApp.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, reach out to us at <a href="https://wa.me/918825205946" target="_blank" rel="noopener noreferrer">WhatsApp: +91 88252 05946</a>.</p>

        <Link href="/" className="btn-primary" style={{ display: "inline-block", marginTop: 24 }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
