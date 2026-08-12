import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund &amp; Return Policy — Swaad Bhandar</title>
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
        <h1>Refund &amp; Return Policy</h1>
        <p className="legal-updated">Last updated: July 2026</p>

        <h2>1. Food Products &amp; Returns</h2>
        <p>As our products are perishable, handmade food items, we do not accept returns once the product has been delivered and accepted, except in cases of damage, incorrect items, or quality issues.</p>

        <h2>2. Reporting an Issue</h2>
        <p>If you receive a damaged, incorrect, or spoiled product, please contact us on WhatsApp within 24 hours of delivery with a photo of the product and your order details.</p>

        <h2>3. Refund or Replacement</h2>
        <p>Once we verify the issue, we will offer either a free replacement on your next order or a refund via UPI/bank transfer, at your preference. Refunds are typically processed within 3-5 business days.</p>

        <h2>4. Order Cancellation</h2>
        <p>Orders can be cancelled by messaging us on WhatsApp before the order has been dispatched. Once dispatched, orders cannot be cancelled.</p>

        <h2>5. Contact Us</h2>
        <p>For any refund or return requests, message us at <a href="https://wa.me/918825205946" target="_blank" rel="noopener noreferrer">WhatsApp: +91 88252 05946</a>.</p>

        <Link href="/" className="btn-primary" style={{ display: "inline-block", marginTop: 24 }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
