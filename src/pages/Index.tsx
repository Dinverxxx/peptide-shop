import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import { apiUrl } from "@/lib/api";

type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    fetch(apiUrl(`/api/products?${params.toString()}`))
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((resp: ProductsResponse) => setData(resp))
      .catch(() => setData({ products: fallbackProducts, total: fallbackProducts.length, page: 1, limit, totalPages: 1 }))
      .finally(() => setLoading(false));
  }, [page, activeCategory, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetch(apiUrl("/api/products/categories"))
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((arr: string[]) => setCategories(Array.isArray(arr) ? arr : fallbackCategories))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params, { replace: true });
  }, [page, activeCategory, searchQuery, setSearchParams]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      <HeroBanner />

      <div id="products" className="container mx-auto px-4 py-10 scroll-mt-20">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-md border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </form>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {loading ? "Loading…" : `Showing ${products.length} of ${total} product${total !== 1 ? "s" : ""}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-md border bg-card text-sm font-medium disabled:opacity-50 disabled:pointer-events-none hover:bg-accent"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-md border bg-card text-sm font-medium disabled:opacity-50 disabled:pointer-events-none hover:bg-accent"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
