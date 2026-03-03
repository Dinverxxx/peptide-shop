import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const badgeStyles = {
  sale: "bg-sale text-sale-foreground hover:bg-sale/90",
  new: "bg-badge-new text-badge-new-foreground hover:bg-badge-new/90",
  popular: "bg-primary text-primary-foreground hover:bg-primary/90",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <Badge className={`absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold ${badgeStyles[product.badge]}`}>
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3">{product.dosage} · {product.capsules} capsules</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-md transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
