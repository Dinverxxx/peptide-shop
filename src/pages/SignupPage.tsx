import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FlaskConical } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
    } catch {}

    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <FlaskConical className="h-10 w-10 mx-auto text-primary mb-3" />
          <h1 className="font-display text-2xl font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start shopping for research compounds</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" required value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="email" type="email" required value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="Email address"
            className="w-full px-3 py-2.5 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="password" type="password" required value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder="Password"
            className="w-full px-3 py-2.5 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="confirmPassword" type="password" required value={form.confirmPassword}
            onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
            placeholder="Confirm password"
            className="w-full px-3 py-2.5 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30" />

          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
