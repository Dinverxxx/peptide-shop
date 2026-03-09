import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { authFetch } from "@/context/AuthContext";
import { apiUrl } from "@/lib/api";

const stripePromise = (() => {
  const key = (import.meta as unknown as { env?: { VITE_STRIPE_PUBLISHABLE_KEY?: string } }).env?.VITE_STRIPE_PUBLISHABLE_KEY;
  return key ? loadStripe(key) : null;
})();

const shippingCost = (total: number) => (total >= 100 ? 0 : 9.95);

function CheckoutForm({
  items,
  totalPrice,
  clearCart,
  shippingInfo,
  clientSecret,
}: {
  items: { product: { id: string; name: string; image: string; price: number }; quantity: number }[];
  totalPrice: number;
  clearCart: () => void;
  shippingInfo: { email: string; firstName: string; lastName: string; address: string; city: string; state: string; zip: string; country: string };
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const shipping = shippingCost(totalPrice);
  const total = totalPrice + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!shippingInfo.email?.trim() || !shippingInfo.firstName?.trim() || !shippingInfo.lastName?.trim() || !shippingInfo.address?.trim() || !shippingInfo.city?.trim() || !shippingInfo.state?.trim() || !shippingInfo.zip?.trim()) {
      toast.error("Please fill in all contact and shipping fields.");
      return;
    }
    setLoading(true);
    const payload = {
      items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
      shippingInfo,
      total: totalPrice,
    };
    try {
      sessionStorage.setItem("checkout_pending", JSON.stringify(payload));
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: {
              name: `${shippingInfo.firstName} ${shippingInfo.lastName}`.trim(),
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.zip,
                country: shippingInfo.country,
              },
            },
          },
        },
      });
      if (error) {
        sessionStorage.removeItem("checkout_pending");
        toast.error(error.message ?? "Payment failed");
        setLoading(false);
        return;
      }
      const res = await authFetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Order failed");
      }
      sessionStorage.removeItem("checkout_pending");
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card border rounded-lg p-5">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const shipping = shippingCost(totalPrice);
  const total = totalPrice + shipping;

  useEffect(() => {
    if (items.length === 0 || total < 0.5) return;
    authFetch("/api/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: total }),
    })
      .then((r) => r.json())
      .then((data: { clientSecret?: string; error?: string }) => {
        if (data.error) setStripeError(data.error);
        else if (data.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(() => setStripeError("Could not initialize payment"));
  }, [items.length, totalPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-2">Nothing to checkout</h1>
        <Link to="/" className="text-primary hover:underline text-sm">Go shopping</Link>
      </div>
    );
  }

  const options = clientSecret
    ? { clientSecret, appearance: { theme: "stripe" as const } }
    : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="font-display text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <fieldset className="bg-card border rounded-lg p-5">
            <legend className="font-display font-bold text-sm px-2">Contact</legend>
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email address"
              className="w-full mt-2 px-3 py-2.5 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </fieldset>

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

          <fieldset className="bg-card border rounded-lg p-5">
            <legend className="font-display font-bold text-sm px-2">Payment</legend>
            {stripeError && (
              <p className="text-sm text-destructive mb-3">{stripeError}</p>
            )}
            {stripePromise && options ? (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  items={items}
                  totalPrice={totalPrice}
                  clearCart={clearCart}
                  shippingInfo={form}
                  clientSecret={clientSecret!}
                />
              </Elements>
            ) : !clientSecret && !stripeError ? (
              <p className="text-sm text-muted-foreground">Loading payment…</p>
            ) : !stripePromise ? (
              <p className="text-sm text-muted-foreground">Stripe is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY.</p>
            ) : null}
          </fieldset>
        </div>

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
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
