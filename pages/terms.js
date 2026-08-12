import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — Swaad Bhandar</title>
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
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: July 2026</p>

        <h2>1. About Us</h2>
        <p>Swaad Bhandar is a home-based food business selling traditional Bihari snacks, including Thekua in various flavors and weights. By using this website, you agree to these Terms of Service.</p>

        <h2>2. Orders</h2>
        <p>When you place an order through our website, your order details are sent to us via WhatsApp. Your order is only confirmed once we respond to you on WhatsApp confirming availability and delivery details.</p>

        <h2>3. Pricing</h2>
        <p>All prices are listed in Indian Rupees (INR) and are subject to change without prior notice. The price at the time of order confirmation on WhatsApp is the final price.</p>

        <h2>4. Payment</h2>
        <p>Currently, payments are accepted via Cash on Delivery (COD) or direct UPI/bank transfer, arranged with you directly over WhatsApp at the time of order confirmation.</p>

        <h2>5. Delivery</h2>
        <p>Delivery timelines will be communicated to you via WhatsApp after order confirmation. Delivery availability may vary by location.</p>

        <h2>6. Product Information</h2>
        <p>We make every effort to describe our products accurately, including ingredients and weight. As all products are handmade, slight variations in appearance are natural and not considered defects.</p>

        <h2>7. Limitation of Liability</h2>
        <p>Swaad Bhandar is not liable for any indirect or consequential loss arising from the use of this website or delays in delivery due to circumstances beyond our control.</p>

        <h2>8. Governing Law</h2>
        <p>These terms are governed by the laws of India.</p>

        <h2>9. Contact Us</h2>
        <p>For any questions, reach out to us at <a href="https://wa.me/918825205946" target="_blank" rel="noopener noreferrer">WhatsApp: +91 88252 05946</a>.</p>

        <Link href="/" className="btn-primary" style={{ display: "inline-block", marginTop: 24 }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
