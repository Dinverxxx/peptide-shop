import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X, FlaskConical } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { totalItems, setIsOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 text-center font-medium tracking-wide">
        Free shipping on all orders over $100 (US) · 99% Purity Guaranteed
      </div>

      {/* Main Nav */}
      <header className="bg-nav text-nav-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span>PeptideLab</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-primary transition-colors">Shop</Link>
              <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-foreground/10 rounded-md overflow-hidden">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent px-3 py-1.5 text-sm outline-none w-48 placeholder:text-nav-foreground/50"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="px-2">
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="hidden md:block hover:text-primary transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Cart */}
              <button onClick={() => setIsOpen(true)} className="relative hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User */}
              <Link to="/login" className="hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden hover:text-primary transition-colors">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-foreground/10 pb-4 px-4">
            <form onSubmit={handleSearch} className="flex items-center bg-foreground/10 rounded-md overflow-hidden mt-3 mb-2">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent px-3 py-2 text-sm outline-none flex-1 placeholder:text-nav-foreground/50"
              />
              <button type="submit" className="px-3">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Shop</Link>
            <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Orders</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-primary">Login</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
