import { FiX } from 'react-icons/fi';
import { ALL_CATEGORIES, ALL_TAGS, getTagColor } from '../types';
import type { Category, Tag } from '../types';

interface FilterChipsProps {
  selectedCategories: Category[];
  selectedTags: Tag[];
  onToggleCategory: (c: Category) => void;
  onToggleTag: (t: Tag) => void;
  onClearAll: () => void;
}

const CATEGORY_CHIP_STYLE = 'bg-surface-700 border border-surface-600 text-gray-300 hover:border-brand-500/60 hover:text-brand-400';
const CATEGORY_ACTIVE_STYLE = 'bg-brand-500/20 border border-brand-500/60 text-brand-400';

export function FilterChips({
  selectedCategories,
  selectedTags,
  onToggleCategory,
  onToggleTag,
  onClearAll,
}: FilterChipsProps) {
  const hasFilters = selectedCategories.length > 0 || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] w-full lg:w-32">
          Category
        </span>
        <div className="flex flex-wrap gap-2 flex-1">
          {ALL_CATEGORIES.map((cat: Category) => {
            const active = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onToggleCategory(cat)}
                className={`text-[10px] uppercase tracking-widest font-black px-4 py-2 rounded-lg border transition-all duration-500 active:scale-90 ${
                  active 
                    ? 'bg-brand-500 border-brand-500 text-surface-950 shadow-lg shadow-brand-500/20' 
                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] w-full lg:w-32">
          Filters
        </span>
        <div className="flex flex-wrap gap-2 flex-1">
          {ALL_TAGS.map((tag: Tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                id={`filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onToggleTag(tag)}
                className={`tag px-4 py-2 border transition-all duration-500 active:scale-90 ${
                  active
                    ? `${getTagColor(tag)} ring-1 ring-white/10 shadow-lg`
                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear all */}
      {hasFilters && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onClearAll}
            id="filter-clear-all"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-500/80 hover:text-red-400 transition-colors bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20"
          >
            <FiX size={12} />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
