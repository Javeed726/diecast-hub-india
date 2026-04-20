import { FaExternalLinkAlt, FaStar, FaThumbtack } from 'react-icons/fa';
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import type { DiecastWebsite } from '../types';
import { getTagColor, CATEGORY_COLORS } from '../types';

interface WebsiteCardProps {
  site: DiecastWebsite;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  isAdmin?: boolean;
  onEdit?: (site: DiecastWebsite) => void;
  onDelete?: (id: string) => void;
}

export function WebsiteCard({
  site,
  isPinned,
  onTogglePin,
  isAdmin,
  onEdit,
  onDelete,
}: WebsiteCardProps) {
  return (
    <div className={`card group relative flex flex-col gap-5 p-6 animate-fade-in ${isPinned ? 'ring-1 ring-brand-500/30 bg-surface-800/40' : ''}`}>
      {/* Featured badge */}
      {site.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-brand-500 text-surface-950 text-[10px] font-black px-2.5 py-1 rounded-md tracking-tighter uppercase shadow-lg shadow-brand-500/20">
          <FaStar size={10} className="fill-surface-950" />
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 flex flex-col gap-1 pt-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-white text-xl tracking-tight group-hover:text-brand-400 transition-colors duration-300 truncate">
              {site.name}
            </h3>
            {isPinned && (
              <FaThumbtack size={12} className="text-brand-400 rotate-45 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${CATEGORY_COLORS[site.category] || 'text-gray-500'}`}>
              {site.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{site.tags.length} Collection Tags</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {site.description && (
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-medium">
          {site.description}
        </p>
      )}

      {/* Tags (Horizontal Scroll on Mobile) */}
      {site.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {site.tags.map((tag: string) => (
            <span key={tag} className={`tag ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 py-3 text-xs tracking-widest uppercase"
          id={`visit-${site.id}`}
        >
          Explore Store
          <FaExternalLinkAlt size={10} className="opacity-60" />
        </a>

        <button
          onClick={() => onTogglePin(site.id)}
          id={`pin-${site.id}`}
          title={isPinned ? 'Remove from favorites' : 'Add to favorites'}
          className={`p-3 rounded-xl border transition-all duration-500 active:scale-95 ${
            isPinned
              ? 'bg-brand-500/10 border-brand-500/30 text-brand-400'
              : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
          }`}
        >
          {isPinned ? <BsPinAngleFill size={18} /> : <BsPinAngle size={18} />}
        </button>

        {/* Admin actions */}
        {isAdmin && onEdit && onDelete && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(site)}
              className="p-3 bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
              title="Edit"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(site.id)}
              className="btn-danger text-sm py-2 px-3"
              title="Delete"
            >
              Del
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
