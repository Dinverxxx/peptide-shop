import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X, FlaskConical, ShoppingBag, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : ""}`;

const Header = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
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
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/" end className={navLinkClass}>
                <ShoppingBag className="h-4 w-4" /> Shop
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                <Package className="h-4 w-4" /> Orders
              </NavLink>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button onClick={() => setIsOpen(true)} className="relative hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User / Logout */}
              {user ? (
                <button type="button" onClick={handleLogout} className="hover:text-primary transition-colors" aria-label="Log out">
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link to="/login" className="hover:text-primary transition-colors" aria-label="Log in">
                  <User className="h-5 w-5" />
                </Link>
              )}

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
            <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 py-2 text-sm font-medium ${isActive ? "text-primary" : "hover:text-primary"}`}>
              <ShoppingBag className="h-4 w-4" /> Shop
            </NavLink>
            <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 py-2 text-sm font-medium ${isActive ? "text-primary" : "hover:text-primary"}`}>
              <Package className="h-4 w-4" /> Orders
            </NavLink>
            {user ? (
              <button type="button" onClick={handleLogout} className="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary w-full">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary">
                <User className="h-4 w-4" /> Login
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
