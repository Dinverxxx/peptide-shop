import { FlaskConical } from "lucide-react";

const Footer = () => (
  <footer className="bg-nav text-nav-foreground/70 mt-16">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-nav-foreground font-display font-bold">
          <FlaskConical className="h-5 w-5 text-primary" />
          PeptideLab
        </div>
        <p className="text-xs text-center">
          © 2026 PeptideLab. For research purposes only. Not for human consumption.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
