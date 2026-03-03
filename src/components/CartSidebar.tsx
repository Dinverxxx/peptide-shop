import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/40 z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Cart ({totalItems})
              </h2>
              <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 bg-muted/50 rounded-lg p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-background border hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-background border hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-5 space-y-3">
                <div className="flex justify-between font-display font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
