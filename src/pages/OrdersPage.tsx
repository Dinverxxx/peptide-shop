import { mockOrders } from "@/data/products";
import { Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  Delivered: "bg-sale/10 text-sale border-sale/20",
  Shipped: "bg-badge-new/10 text-badge-new border-badge-new/20",
  Processing: "bg-primary/10 text-primary border-primary/20",
};

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold mb-8">Order History</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-bold text-sm">{order.id}</h3>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusStyles[order.status]}>
                    {order.status}
                  </Badge>
                  <span className="font-display font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
                    <span className="text-sm flex-1">{item.product.name}</span>
                    <span className="text-xs text-muted-foreground">× {item.quantity}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  // Mock: GET /api/orders/{order.id}
                  fetch(`/api/orders/${order.id}`).catch(() => {});
                }}
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-4"
              >
                View Details <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
