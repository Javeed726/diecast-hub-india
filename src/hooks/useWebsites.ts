import { useState, useEffect } from "react";
import { subscribeToWebsites } from "../firebase/websites";
import type { DiecastWebsite } from "../types";

const CACHE_KEY = "die-list-websites-cache";

// 📦 Demo seed data — Refreshed with specific requested sites
const DEMO_DATA: DiecastWebsite[] = [
  {
    id: "demo-1",
    name: "Karz and Dolls",
    url: "https://www.karzanddolls.com/",
    logo: "https://ui-avatars.com/api/?name=KD&background=f97316&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["preorder", "premium", "Mrp"],
    description:
      "One of India's most popular destinations for 1:64 scale models, featuring Mini-GT, Pop Race, and many premium brands.",
    createdAt: Date.now() - 1000,
    featured: true,
  },
  {
    id: "demo-2",
    name: "Krazy Caterpillar",
    url: "https://krazycaterpillar.com/",
    logo: "https://ui-avatars.com/api/?name=KC&background=8b5cf6&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["Mrp", "premium"],
    description:
      "Extensive collection of diecast models ranging from budget-friendly options to high-end collector items.",
    createdAt: Date.now() - 2000,
    featured: true,
  },
  {
    id: "demo-3",
    name: "ToyMarche",
    url: "https://www.toymarche.com/",
    logo: "https://ui-avatars.com/api/?name=TM&background=3b82f6&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["Mrp", "budget"],
    description:
      "A wide variety of toys and diecast models. Great for finding mainline releases and building a collection.",
    createdAt: Date.now() - 3000,
  },
  {
    id: "demo-4",
    name: "ToyCra",
    url: "https://toycra.com/",
    logo: "https://ui-avatars.com/api/?name=TC&background=10b981&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["Mrp", "premium"],
    description:
      "A premium toy store with a dedicated diecast section featuring several international brands.",
    createdAt: Date.now() - 4000,
  },
  {
    id: "demo-5",
    name: "ScaleArts India",
    url: "https://scalearts.in/",
    logo: "https://ui-avatars.com/api/?name=SA&background=ef4444&color=fff&bold=true&size=128",
    category: "Premium Diecast",
    tags: ["premium", "imported", "rarefinds"],
    description:
      "Specialized in high-end scale models like 1:18 and 1:43 from brands like AUTOart, Kyosho, and Minichamps.",
    createdAt: Date.now() - 5000,
  },
  {
    id: "demo-6",
    name: "Not A Toy",
    url: "https://www.notatoy.in/",
    logo: "https://ui-avatars.com/api/?name=NT&background=1e293b&color=fff&bold=true&size=128",
    category: "Premium Diecast",
    tags: ["rarefinds", "premium", "Mrp"],
    description:
      "A niche collector store focused on rare and high-detail diecast models for serious enthusiasts.",
    createdAt: Date.now() - 6000,
  },
];

interface UseWebsitesResult {
  websites: DiecastWebsite[];
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

export function useWebsites(): UseWebsitesResult {
  const [websites, setWebsites] = useState<DiecastWebsite[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.warn("Failed to parse cache:", e);
    }
    return DEMO_DATA; // Fallback to demo data immediately on absolute first visit
  });

  // We are "loading" the live data in the background, but we show what we have (cache or demo)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(() => !localStorage.getItem(CACHE_KEY));

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    setLoading(true); // Signal that we are fetching fresh data

    try {
      unsubscribe = subscribeToWebsites(
        (sites) => {
          if (sites.length > 0) {
            setWebsites(sites);
            setIsDemo(false);
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(sites));
            } catch (e) {
              console.warn("Failed to cache websites:", e);
            }
          } else if (websites.length === 0) {
            // Only use demo data if we have absolutely nothing else and live returned empty
            setWebsites(DEMO_DATA);
            setIsDemo(true);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.warn("Firebase error, staying with current data:", err);
          setLoading(false);
          setError(null);
          // If we had nothing, at least show demo
          if (websites.length === 0) {
            setWebsites(DEMO_DATA);
            setIsDemo(true);
          }
        },
      );
    } catch (err) {
      console.warn("Firebase not configured");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { websites, loading, error, isDemo };
}
