import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    const raw = sessionStorage.getItem("checkout_pending");
    sessionStorage.removeItem("checkout_pending");
    if (!raw) {
      setStatus("done");
      return;
    }
    try {
      const payload = JSON.parse(raw);
      authFetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            clearCart();
            setStatus("done");
          } else setStatus("error");
        })
        .catch(() => setStatus("error"));
    } catch {
      setStatus("error");
    }
  }, [clearCart]);

  useEffect(() => {
    if (status === "done") navigate("/orders", { replace: true });
  }, [status, navigate]);

  if (status === "error") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive mb-4">Something went wrong placing your order.</p>
        <button type="button" onClick={() => navigate("/orders")} className="text-primary hover:underline">
          View orders
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground">Completing your order…</p>
    </div>
  );
};

export default CheckoutSuccessPage;
