import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, FlaskConical, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, text: "Free Shipping Over $100" },
  { icon: FlaskConical, text: "99% Purity Tested" },
  { icon: Shield, text: "Quality Guaranteed" },
  { icon: Lock, text: "Secure Checkout" },
];

const HeroBanner = () => (
  <section
    className="text-nav-foreground relative overflow-hidden bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/dashboard.jpg)" }}
  >
    <div className="absolute inset-0 z-0 bg-nav/80" aria-hidden />
    <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Premium Research
          <br />
          <span className="text-gradient">Peptides & SARMs</span>
        </h1>
        <p className="text-nav-foreground/70 text-lg mb-8 max-w-lg">
          Lab-tested compounds for advanced research. Same-day shipping on all US orders.
        </p>
        <Link
          to="/?category=Peptides"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
        >
          Shop Now <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>

    {/* Feature strip */}
    <div className="relative z-10 border-t border-nav-foreground/10 bg-nav-foreground/5">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-3 text-sm">
              <f.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroBanner;
