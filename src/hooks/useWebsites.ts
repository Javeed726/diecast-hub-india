import { useState, useEffect } from "react";
import { subscribeToWebsites } from "../firebase/websites";
import type { DiecastWebsite } from "../types";

// 📦 Demo seed data — refreshed to match new categories and tags
const DEMO_DATA: DiecastWebsite[] = [
  {
    id: "demo-1",
    name: "HobbyWala India",
    url: "https://hobbywala.in",
    logo: "https://ui-avatars.com/api/?name=HW&background=f97316&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["Mrp", "premium", "preorder"],
    description:
      "One of India's largest diecast retailers with a huge range of brands, from Hotwheels to premium scale models.",
    createdAt: Date.now() - 5000,
    featured: true,
  },
  {
    id: "demo-2",
    name: "Diecast Model Store",
    url: "https://diecastmodelstore.in",
    logo: "https://ui-avatars.com/api/?name=DM&background=8b5cf6&color=fff&bold=true&size=128",
    category: "Premium Diecast",
    tags: ["premium", "imported", "rarefinds"],
    description:
      "Specializing in 1:18 and 1:43 premium scale models from brands like AUTOart, Minichamps, and Spark.",
    createdAt: Date.now() - 10000,
    featured: true,
  },
  {
    id: "demo-3",
    name: "Mini-GT Specialist",
    url: "https://minigtindia.com",
    logo: "https://ui-avatars.com/api/?name=MGT&background=3b82f6&color=fff&bold=true&size=128",
    category: "Mini-GT",
    tags: ["preorder", "imported", "premium"],
    description:
      "Your dedicated source for Mini-GT 1:64 scale models, featuring the latest drops and hard-to-find chase pieces.",
    createdAt: Date.now() - 15000,
  },
  {
    id: "demo-4",
    name: "Elite Diecast",
    url: "https://elitediecast.in",
    logo: "https://ui-avatars.com/api/?name=ED&background=8b5cf6&color=fff&bold=true&size=128",
    category: "Premium Diecast",
    tags: ["rarefinds", "premium", "imported"],
    description:
      "Curated rare and discontinued diecast models. Great for serious collectors looking for grails.",
    createdAt: Date.now() - 20000,
  },
  {
    id: "demo-5",
    name: "Collectors Hub",
    url: "https://collectorshub.in",
    logo: "https://ui-avatars.com/api/?name=CH&background=10b981&color=fff&bold=true&size=128",
    category: "Multi-Brand",
    tags: ["RC cars", "imported", "premium"],
    description:
      "A variety of models including RC cars, high-end diecast, and limited edition releases.",
    createdAt: Date.now() - 25000,
  },
  {
    id: "demo-6",
    name: "Hotwheels India",
    url: "https://hotwheelsindia.in",
    logo: "https://ui-avatars.com/api/?name=HI&background=f59e0b&color=fff&bold=true&size=128",
    category: "Hotwheels",
    tags: ["Mrp", "non mrp", "non licensed cars"],
    description:
      "Affordable Hotwheels listings, including mainline and premium sets at transparent pricing.",
    createdAt: Date.now() - 30000,
  },
];

interface UseWebsitesResult {
  websites: DiecastWebsite[];
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

export function useWebsites(): UseWebsitesResult {
  const [websites, setWebsites] = useState<DiecastWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeToWebsites(
        (sites) => {
          if (sites.length === 0 && loading) {
            setWebsites(DEMO_DATA);
            setIsDemo(true);
          } else {
            setWebsites(sites);
            setIsDemo(false);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.warn("Firebase error, falling back to demo data:", err);
          setWebsites(DEMO_DATA);
          setIsDemo(true);
          setLoading(false);
          setError(null);
        },
      );
    } catch (err) {
      console.warn("Firebase not configured, using demo data");
      setWebsites(DEMO_DATA);
      setIsDemo(true);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { websites, loading, error, isDemo };
}
