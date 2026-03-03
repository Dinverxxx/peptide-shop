import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
        <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to get started.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card rounded-lg border p-4">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">{item.product.dosage} · {item.product.capsules} capsules</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded border hover:bg-muted">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded border hover:bg-muted">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
                <span className="font-display font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="bg-card border rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{totalPrice >= 100 ? "Free" : "$9.95"}</span>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between font-display font-bold text-lg">
            <span>Total</span>
            <span>${(totalPrice + (totalPrice >= 100 ? 0 : 9.95)).toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-md font-semibold mt-6 hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </Link>
          <Link to="/" className="block text-center text-sm text-muted-foreground mt-3 hover:text-foreground">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
