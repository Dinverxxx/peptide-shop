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
    className="text-nav-foreground relative overflow-hidden flex flex-col min-h-[420px] md:min-h-[480px] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/dashboard.jpg)" }}
  >
    <div className="absolute inset-0 z-0 bg-black/80" aria-hidden />
    <div className="relative flex-1 min-h-[320px] md:min-h-[360px] flex flex-col">
      <div className="container relative z-10 mx-auto px-6 md:px-8 py-16 md:py-24 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl pl-2 md:pl-4"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Premium Research
            <br />
            <span className="text-gradient">Peptides & SARMs</span>
          </h1>
          <p className="text-nav-foreground/70 text-lg mb-8 max-w-lg">
            Lab-tested compounds for advanced research. Same-day shipping on all US orders.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>

    {/* Feature strip - bottom of panel */}
    <div className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-md shrink-0">
      <div className="container mx-auto px-6 md:px-8 py-5">
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
