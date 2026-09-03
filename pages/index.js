import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import categories from "../data/products";
import { Search, Heart, User, ShoppingBag, Truck, Home as HomeIcon, Leaf, ScrollText, Star, HeartHandshake, Camera, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const { addItem, count } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem("swad-bhandar-wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const updated = prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id];
      window.localStorage.setItem("swad-bhandar-wishlist", JSON.stringify(updated));
      return updated;
    });
  }
  const [choices, setChoices] = useState({});
  const [weightChoices, setWeightChoices] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", text: "" });

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setReviews(data);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function submitReview() {
    if (!reviewForm.name || !reviewForm.text) return;
    const { error } = await supabase
      .from("reviews")
      .insert([{ name: reviewForm.name, review_text: reviewForm.text }]);
    if (!error) {
      setReviewForm({ name: "", text: "" });
      fetchReviews();
    }
  }

  function getChoice(id) {
    return choices[id] || "oil";
  }

  function setChoice(id, value) {
    setChoices((prev) => ({ ...prev, [id]: value }));
  }

  function getWeight(p) {
    return weightChoices[p.id] || p.weights[0].label;
  }

  function setWeight(id, label) {
    setWeightChoices((prev) => ({ ...prev, [id]: label }));
  }

  function handleAddToCart(p) {
    const weightLabel = getWeight(p);
    const weightObj = p.weights.find((w) => w.label === weightLabel);
    const choice = getChoice(p.id);
    const isGhee = choice === "ghee";

    addItem({
      id: `${p.id}-${weightLabel}-${choice}`,
      name: `${p.name} (${weightLabel}) — ${isGhee ? "Desi Ghee" : "Oil"}`,
      price: isGhee ? weightObj.priceGhee : weightObj.priceOil,
      emoji: p.emoji,
      color: p.color,
    });
  }

  return (
    <>
      <Head>
        <title>Swad Bhandar — Authentic Homemade Snacks Online</title>
        <meta name="description" content="Swad Bhandar brings traditional, handmade snacks like Thekua, Khakra and Makhana — no preservatives, no palm oil, made fresh and delivered to your door." />
        <meta property="og:title" content="Swad Bhandar — Authentic Homemade Snacks" />
        <meta property="og:description" content="Traditional recipes, homemade with love. Order Thekua, Khakra and Makhana online." />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <header className={scrolled ? "scrolled" : ""}>
        <nav className="nav">
          <div className="logo">
            <Image src="/images/logo.png" alt="Swad Bhandar" width={48} height={48} className="logo-img" />
            Swad Bhandar
          </div>
          <div className="nav-links">
            <Link href="/" className={router.pathname === "/" ? "active-link" : ""}>Home</Link>
            <a href="#products">Products</a>
          </div>
          <Link href="/cart" className="cart-btn">
            <ShoppingBag size={17} /> Cart · {count}
          </Link>
        </nav>
      </header>

      <div className="ribbon">
        <div className="ribbon-track">
          <span>Ek Bhandar, Har Ghar Ka Swad</span>
          <span>🏠 A Taste of Home, For Every Home</span>
          <span>😊 Happy Customers</span>
          <span>🌿 No Palm Oil</span>
        </div>
      </div>

      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-ornament"></div>
          <h1>
            Ek <em>Bhandar</em>,<br />
            Har Ghar Ka Swad
          </h1>
          <p className="hero-subtitle">The taste of yesteryears, made for today.</p>
          <p>
            Swad Bhandar laata hai woh purane, dadi-nani wale recipes —
            mathri, namkeen, aur mithai — jo aaj bhi ghar jaisa hi lagta hai.
            Fresh banaya, seedha aapke darwaze tak.
          </p>
          <div className="hero-cta-group">
            <a href="#products" className="btn-primary shop-now-btn">
              Shop Now →
            </a>
            <a href="#why-us" className="btn-secondary-outline">
              Our Story
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-floating"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <div className="floating-pouch p1">
            <Image src="/images/sugar-thekua.png" alt="Thekua" width={170} height={220} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
          <div className="floating-pouch p2">
            <Image src="/images/gud-thekua.png" alt="Gud Thekua" width={200} height={260} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
          <div className="floating-pouch p3">
            <Image src="/images/khakra-packaging.png" alt="Khakra" width={160} height={210} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        </motion.div>
      </section>

      <div className="trust-strip">
        <div className="trust-item">
          <span className="icon"><Truck size={26} /></span>
          <div>
            <strong>Free Shipping</strong>
            <span>On orders above ₹499</span>
          </div>
        </div>
        <div className="trust-item">
          <span className="icon"><HomeIcon size={26} /></span>
          <div>
            <strong>100% Homemade</strong>
            <span>Traditional recipes</span>
          </div>
        </div>
        <div className="trust-item">
          <span className="icon"><Leaf size={26} /></span>
          <div>
            <strong>No Preservatives</strong>
            <span>Fresh, natural ingredients</span>
          </div>
        </div>
      </div>

      <div className="deco-divider"><span className="deco-line"></span><span className="deco-motif">✦</span><span className="deco-line"></span></div>
      <motion.section
        className="section"
        id="products"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">Our Signature Collection</p>
        <h2 className="section-heading">Bestsellers</h2>
        <div className="section-divider"></div>

        {!selectedCategory ? (
          <div className="category-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="category-visual" style={{ background: cat.image ? "#F6EEDD" : "#F5C518" }}>
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill style={{ objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: "3rem" }}>{cat.icon}</span>
                  )}
                </div>
                <h3>{cat.icon} {cat.name}</h3>
              </div>
            ))}
          </div>
        ) : (

          <div>
            <button className="back-to-categories" onClick={() => setSelectedCategory(null)}>
              ← Back to all categories
            </button>

            <div className="product-grid">
              {categories
                .find((c) => c.id === selectedCategory)
                .products.map((p) => {
                  const weightLabel = getWeight(p);
                  const weightObj = p.weights.find((w) => w.label === weightLabel);
                  const choice = getChoice(p.id);
                  const isGhee = choice === "ghee";
                  const price = isGhee ? weightObj.priceGhee : weightObj.priceOil;
                  const oldPrice = isGhee ? weightObj.oldPriceGhee : weightObj.oldPriceOil;

                  return (
                    <div className="product-card" key={p.id}>
                      {p.tag && <span className="product-tag">{p.tag}</span>}
                      <button
                        className={`wishlist-icon-btn${wishlist.includes(p.id) ? " active" : ""}`}
                        title="Add to Wishlist"
                        onClick={() => toggleWishlist(p.id)}
                      >
                        <Heart size={16} fill={wishlist.includes(p.id) ? "currentColor" : "none"} />
                      </button>
                      <div className="product-visual" style={{ background: p.image ? "#F6EEDD" : p.color }}>
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} />
                        ) : (
                          p.emoji
                        )}
                      </div>
                      <h3>{p.name}</h3>
                      {p.description && <p className="product-desc">{p.description}</p>}

                      <div className="product-rating">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} />
                        <span>(4.0)</span>
                      </div>

                      <div className="weight-toggle">
                        {p.weights.map((w) => (
                          <button
                            key={w.label}
                            className={weightLabel === w.label ? "active" : ""}
                            onClick={() => setWeight(p.id, w.label)}
                          >
                            {w.label}
                          </button>
                        ))}
                      </div>

                      <div className="oil-toggle">
                        <button
                          className={!isGhee ? "active" : ""}
                          onClick={() => setChoice(p.id, "oil")}
                        >
                          Oil
                        </button>
                        <button
                          className={isGhee ? "active" : ""}
                          onClick={() => setChoice(p.id, "ghee")}
                        >
                          Desi Ghee
                        </button>
                      </div>

                      <div className="product-price">
                        {oldPrice && <span className="price-old">₹{oldPrice}</span>}
                        <span className="price-new">₹{price}</span>
                        {oldPrice && (
                          <span style={{ background: "var(--ink-green)", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 8, marginLeft: 6 }}>
                            {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      {p.comingSoon ? (
                        <button className="add-cart" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                          Coming Soon
                        </button>
                      ) : (
                        <button className="add-cart" onClick={() => handleAddToCart(p)}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </motion.section>

      <div className="deco-divider"><span className="deco-line"></span><span className="deco-motif">✦</span><span className="deco-line"></span></div>
      <motion.section className="section" id="why-us" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <p className="section-eyebrow">The Swad Bhandar Promise</p>
        <h2 className="section-heading">Why Choose Swad Bhandar</h2>
        <div className="section-divider"></div>
        <div className="why-us-grid">
          <div className="why-us-card">
            <div className="why-icon"><HomeIcon size={30} /></div>
            <h4>100% Homemade</h4>
            <p>The taste of home, every single time</p>
          </div>
          <div className="why-us-card">
            <div className="why-icon"><Leaf size={30} /></div>
            <h4>No Preservatives</h4>
            <p>Only pure, natural ingredients</p>
          </div>
          <div className="why-us-card">
            <div className="why-icon"><ScrollText size={30} /></div>
            <h4>Traditional Recipe</h4>
            <p>Recipes passed down through generations</p>
          </div>
          <div className="why-us-card">
            <div className="why-icon"><Star size={30} /></div>
            <h4>Premium Ingredients</h4>
            <p>Pure desi ghee, fresh spices</p>
          </div>
          <div className="why-us-card">
            <div className="why-icon"><HeartHandshake size={30} /></div>
            <h4>Made with Love</h4>
            <p>Every batch made with love</p>
          </div>
          <div className="why-us-card">
            <div className="why-icon"><Truck size={30} /></div>
            <h4>Fast Delivery</h4>
            <p>Delivered straight to your door</p>
          </div>
        </div>
      </motion.section>

      <div className="deco-divider"><span className="deco-line"></span><span className="deco-motif">✦</span><span className="deco-line"></span></div>
      <section className="testimonials-section" style={{ background: "var(--paper-warm)" }}>
        <p className="section-eyebrow">What Our Customers Say</p>
        <h2 className="section-heading">Write a Review</h2>
        <div className="section-divider"></div>

        <div className="review-form">
          <input
            placeholder="Your Name"
            value={reviewForm.name}
            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
          />
          <textarea
            placeholder="Write your review here..."
            value={reviewForm.text}
            onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
          />
          <button onClick={submitReview}>Submit Review</button>
        </div>

        <div className="testi-grid">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to write one!</p>
          ) : (
            reviews.map((r) => (
              <div className="testi-card" key={r.id}>
                <p>"{r.review_text}"</p>
                <div className="testi-name">— {r.name}</div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="deco-divider"><span className="deco-line"></span><span className="deco-motif">✦</span><span className="deco-line"></span></div>
      <section className="cta-band">
        <h2>Bring Authentic Homemade Taste To Your Home</h2>
        <a href="#products" className="btn-primary shop-now-btn">Explore Products</a>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <Image src="/images/logo.png" alt="Swad Bhandar" width={40} height={40} className="logo-img" />
              Swad Bhandar
            </div>
            <p style={{ fontSize: "0.88rem" }}>Bringing you the trusted taste of home, delivered.</p>
            <div className="payment-chip-row">
              <span className="payment-chip">UPI</span>
              <span className="payment-chip">COD</span>
              <span className="payment-chip">GPay</span>
              <span className="payment-chip">PhonePe</span>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#products">Products</a></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4>Policies</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/refund-policy">Refund &amp; Return Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li><a href="https://wa.me/918825205946" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MessageCircle size={15} /> +91 88252 05946</a></li>
              <li><a href="https://instagram.com/officialswadbhandar" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Camera size={15} /> @officialswadbhandar</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Swad Bhandar. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑ Back to Top
        </button>
      </footer>
    </>
  );
}
