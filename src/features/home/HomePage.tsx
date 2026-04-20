import { useState, useMemo } from 'react';
import { FaThumbtack } from 'react-icons/fa';
import { FiGlobe, FiInfo } from 'react-icons/fi';
import { useWebsites } from '../../hooks/useWebsites';
import { usePins } from '../../hooks/usePins';
import { WebsiteCard } from '../../components/WebsiteCard';
import { CardSkeleton } from '../../components/CardSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { FilterChips } from '../../components/FilterChips';
import type { Category, Tag } from '../../types';

export function HomePage() {
  const { websites, loading, isDemo } = useWebsites();
  const { isPinned, togglePin } = usePins();

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // ── Derived filtered lists ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return websites.filter((site) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q)) ||
        (site.description?.toLowerCase().includes(q) ?? false);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(site.category) ||
        (site.category === 'Multi-Brand' && selectedCategories.some(c => c !== 'Multi-Brand'));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => site.tags.includes(t));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [websites, search, selectedCategories, selectedTags]);

  const pinnedSites = useMemo(
    () => filtered.filter((s) => isPinned(s.id)),
    [filtered, isPinned]
  );

  const unpinnedSites = useMemo(
    () => filtered.filter((s) => !isPinned(s.id)),
    [filtered, isPinned]
  );

  const toggleCategory = (c: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleTag = (t: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      {/* py-10  */}
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-500/10 blur-[100px] rounded-full opacity-20" />
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* Demo banner */}
      {isDemo && (
        <div className="flex items-start gap-3 bg-brand-500/5 border border-brand-500/10 rounded-2xl p-4 animate-fade-in max-w-xl mx-auto">
          <FiInfo size={18} className="text-brand-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-400 text-xs leading-relaxed">
            <span className="text-brand-300 font-bold mr-1">PREVIEW MODE:</span>
            Showing sample data. Connect a database for live listings. Your pins will persist!
          </p>
        </div>
      )}

      {/* Search + Filters */}
      <section className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          resultCount={filtered.length}
        />
        <FilterChips
          selectedCategories={selectedCategories}
          selectedTags={selectedTags}
          onToggleCategory={toggleCategory}
          onToggleTag={toggleTag}
          onClearAll={clearFilters}
        />
      </section>

      {loading ? (
        /* Skeleton grid */
        <section className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* ⭐ Pinned Section */}
          {pinnedSites.length > 0 && (
            <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <FaThumbtack size={20} className="text-brand-400 rotate-45 shrink-0" />
                  </div>
                  <div>
                    <h2 className="text-white font-display font-bold text-xl">Favorites</h2>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Quick Access</p>
                  </div>
                </div>
                <div className="h-px flex-1 bg-white/5 mx-8 hidden sm:block" />
                <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full uppercase tracking-tighter">
                  {pinnedSites.length} Saved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pinnedSites.map((site) => (
                  <WebsiteCard
                    key={site.id}
                    site={site}
                    isPinned={isPinned(site.id)}
                    onTogglePin={togglePin}
                  />
                ))}
              </div>

              {/* Divider */}
              {unpinnedSites.length > 0 && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex-1 h-px bg-surface-700" />
                  <span className="text-xs text-gray-600 font-medium">All Sites</span>
                  <div className="flex-1 h-px bg-surface-700" />
                </div>
              )}
            </section>
          )}

          {/* 🌐 All Sites Grid */}
          {unpinnedSites.length > 0 && (
            <section className="space-y-4">
              {pinnedSites.length === 0 && (
                <div className="flex items-center gap-2 text-gray-400 font-display font-semibold text-lg">
                  <FiGlobe size={18} />
                  All Sites
                  <span className="text-xs text-gray-600 bg-surface-800 border border-surface-700 px-2 py-0.5 rounded-full font-normal ml-1">
                    {unpinnedSites.length}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {unpinnedSites.map((site) => (
                  <WebsiteCard
                    key={site.id}
                    site={site}
                    isPinned={isPinned(site.id)}
                    onTogglePin={togglePin}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 🚀 Feature Roadmap Section */}
          <section className="pt-16 pb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.4em] bg-brand-500/10 px-4 py-1.5 rounded-full border border-brand-500/20">
                Roadmap to V2
              </span>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                Driving the <span className="text-gradient">Future</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-lg">
                The hub is just getting started. Here is what we are building for the ultimate collector experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Community Submissions',
                  desc: 'A way for you to suggest your favorite stores and help us grow.',
                  tag: 'Phase 1'
                },
                {
                  title: 'Trust & Reviews',
                  desc: 'Collector-driven ratings to find the most reliable sellers.',
                  tag: 'Phase 2'
                },
                {
                  title: 'Live Drop Alerts',
                  desc: 'Get notified the second new Mini-GT or Hot Wheels stock drops.',
                  tag: 'Pro'
                },
                {
                  title: 'Event Calendar',
                  desc: 'A listing of all diecast meets and exhibitions across India.',
                  tag: 'Community'
                }
              ].map((feature, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-surface-900/40 border border-white/5 hover:border-brand-500/20 transition-all duration-500">
                  <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-brand-500/50 group-hover:text-brand-500 transition-colors">
                    {feature.tag}
                  </div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-surface-800" />
                Stay Tuned for Updates
                <span className="h-px w-8 bg-surface-800" />
              </p>
            </div>
          </section>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 space-y-3">
              <div className="text-5xl">🔍</div>
              <p className="text-white font-display font-semibold text-xl">
                No sites found
              </p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or clearing filters.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
