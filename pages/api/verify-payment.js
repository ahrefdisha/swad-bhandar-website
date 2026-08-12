import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customer,
    items,
    total,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    return res.status(400).json({ success: false, error: "Invalid signature" });
  }

  console.log("✅ New paid order:", {
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    customer,
    items,
    total,
  });

  res.status(200).json({ success: true });
}
