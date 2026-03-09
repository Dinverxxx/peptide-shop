import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth, authFetch } from "@/context/AuthContext";

type OrderItem = { product: { id: string; name: string; image: string; price: number }; quantity: number };
type Order = { id: string; date: string; status: string; total: number; items: OrderItem[] };

const statusStyles: Record<string, string> = {
  Delivered: "bg-sale/10 text-sale border-sale/20",
  Shipped: "bg-badge-new/10 text-badge-new border-badge-new/20",
  Processing: "bg-primary/10 text-primary border-primary/20",
};

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    authFetch("/api/orders")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Order[]) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Order History</h1>
        <p className="text-muted-foreground mb-4">Sign in to view your orders.</p>
        <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold mb-8">Order History</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-bold text-sm">{order.id}</h3>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusStyles[order.status] ?? "bg-muted"}>
                    {order.status}
                  </Badge>
                  <span className="font-display font-bold">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div key={item.product?.id ?? i} className="flex items-center gap-3">
                    <img src={item.product?.image} alt={item.product?.name} className="w-10 h-10 rounded object-cover" />
                    <span className="text-sm flex-1">{item.product?.name}</span>
                    <span className="text-xs text-muted-foreground">× {item.quantity}</span>
                  </div>
                ))}
              </div>

              <a
                href={`#order-${order.id}`}
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-4"
              >
                View Details <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
