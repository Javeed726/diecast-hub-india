export interface DiecastWebsite {
  id: string;
  name: string;
  url: string;
  logo?: string;
  category: Category;
  tags: Tag[];
  description?: string;
  createdAt: number;
  featured?: boolean;
}

export type Category =
  | "Hotwheels"
  | "Premium Diecast"
  | "Mini-GT"
  | "Multi-Brand";

export type Tag =
  | "Mrp"
  | "preorder"
  | "imported"
  | "budget"
  | "premium"
  | "rarefinds"
  | "non licensed cars"
  | "RC cars"
  | "non mrp";

export const ALL_CATEGORIES: Category[] = [
  "Hotwheels",
  "Premium Diecast",
  "Mini-GT",
  "Multi-Brand",
];

export const ALL_TAGS: Tag[] = [
  "Mrp",
  "non mrp",
  "preorder",
  "imported",
  "budget",
  "premium",
  "rarefinds",
  "non licensed cars",
  "RC cars",
];

// 🎨 Robust color mapping function to handle casing discrepancies and old data
export function getTagColor(tag: string): string {
  const t = tag.toLowerCase().trim();

  // High-priority matches
  if (t === "mrp")
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (t === "preorder")
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (t === "imported")
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  if (t === "premium")
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (t === "rarefinds" || t === "rare finds")
    return "bg-red-500/10 text-red-400 border-red-500/20";
  if (t.includes("non licensed") || t.includes("unlicensed"))
    return "bg-brand-500/10 text-brand-400 border-brand-500/20";
  if (t.includes("rc car"))
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (t === "non mrp")
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";

  // Legacy/Other matches
  if (t === "hot wheels" || t === "hotwheels")
    return "bg-brand-500/10 text-brand-400 border-brand-500/20";
  if (t === "budget")
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

  return "bg-white/5 border-white/10 text-gray-400";
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Hotwheels: "text-brand-400",
  "Premium Diecast": "text-amber-400",
  "Mini-GT": "text-blue-400",
  "Multi-Brand": "text-purple-400",
};
