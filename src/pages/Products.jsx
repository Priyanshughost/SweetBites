import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import SplitText from "../components/SplitText";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import BlurText from "@/components/BlurText";
import axios from "axios";
import { toast } from "sonner";

export default function Products() {
  const { products, setProducts } = useProducts();

  // derive categories from data + "All"
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  // local UI state
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  // filtering + sorting
  function byCategory(cat, list) {
    if (cat === "All") return list;
    return list.filter(p => p.category === cat);
  }
  function byQuery(list) {
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(p =>
      [p.name, p.category, String(p.price)]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    );
  }
  function bySort(list) {
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list; // featured
  }

  function getAllProducts() {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getAllProducts`)
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch(e => {
        toast.error(e.response.data.message || "Failed to load Products")
      })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <header className="mb-8 text-center flex flex-col">
        <SplitText
          text="Our Menu"
          className="text-3xl font-semibold tracking-tight mb-6"
          delay={20}
          by="word"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        />
        <SplitText
          text="Clean catalog. Fast to browse. Easy to order."
          className="text-stone-600 text-base leading-relaxed mb-10"
          delay={20}
          by="word"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        />
      </header>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="w-full sm:max-w-sm">
          <Input
            placeholder="Search cakes, pastries, cookies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-600">Sort</span>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Categories as Tabs (shadcn) */}
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto bg-stone-100">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-stone-900 data-[state=active]:text-white">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => {
          // compute once per tab
          const list = bySort(byQuery(byCategory(cat, products)));
          return (
            <TabsContent key={cat} value={cat}>
              {list.length === 0 ? (
                <p className="text-center text-stone-500">No items found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {list.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
