import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingInfo: form, total: totalPrice }),
      });
      // In mock mode, this will fail - that's OK
      if (!res.ok) throw new Error();
    } catch {
      // Mock success
    }

    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    }, 1500);
  };

  const shipping = totalPrice >= 100 ? 0 : 9.95;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-2">Nothing to checkout</h1>
        <Link to="/" className="text-primary hover:underline text-sm">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="font-display text-2xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <fieldset className="bg-card border rounded-lg p-5">
            <legend className="font-display font-bold text-sm px-2">Contact</legend>
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email address"
              className="w-full mt-2 px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </fieldset>

          {/* Shipping */}
          <fieldset className="bg-card border rounded-lg p-5 space-y-3">
            <legend className="font-display font-bold text-sm px-2">Shipping Address</legend>
            <div className="grid grid-cols-2 gap-3">
              <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="First name"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Last name"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input name="address" required value={form.address} onChange={handleChange} placeholder="Address"
              className="w-full px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="grid grid-cols-3 gap-3">
              <input name="city" required value={form.city} onChange={handleChange} placeholder="City"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input name="state" required value={form.state} onChange={handleChange} placeholder="State"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input name="zip" required value={form.zip} onChange={handleChange} placeholder="ZIP"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="bg-card border rounded-lg p-5 space-y-3">
            <legend className="font-display font-bold text-sm px-2">Payment</legend>
            <input name="cardNumber" required value={form.cardNumber} onChange={handleChange} placeholder="Card number"
              className="w-full px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="grid grid-cols-2 gap-3">
              <input name="expiry" required value={form.expiry} onChange={handleChange} placeholder="MM/YY"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input name="cvc" required value={form.cvc} onChange={handleChange} placeholder="CVC"
                className="px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </fieldset>
        </div>

        {/* Order summary */}
        <div className="bg-card border rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="truncate max-w-[60%]">{item.product.name} × {item.quantity}</span>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-display font-bold text-lg">
            <span>Total</span>
            <span>${(totalPrice + shipping).toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold mt-6 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
