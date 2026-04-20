import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiLoader } from 'react-icons/fi';
import { ALL_CATEGORIES, ALL_TAGS } from '../../types';
import type { DiecastWebsite, Category, Tag } from '../../types';
import { addWebsite, updateWebsite } from '../../firebase/websites';

interface WebsiteFormProps {
  editSite?: DiecastWebsite | null;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY_FORM = {
  name: '',
  url: '',
  category: 'Multi-Brand' as Category,
  tags: [] as Tag[],
  description: '',
  featured: false,
};

export function WebsiteForm({ editSite, onClose, onSaved }: WebsiteFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editSite) {
      setForm({
        name: editSite.name,
        url: editSite.url,
        category: editSite.category,
        tags: editSite.tags,
        description: editSite.description ?? '',
        featured: editSite.featured ?? false,
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
  }, [editSite]);

  const toggleTag = (tag: Tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.url.trim()) {
      setError('Name and URL are required.');
      return;
    }

    // Ensure URL has protocol
    const url = form.url.startsWith('http') ? form.url : `https://${form.url}`;
    const payload = { ...form, url };

    setLoading(true);
    try {
      if (editSite) {
        await updateWebsite(editSite.id, payload);
      } else {
        await addWebsite(payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError('Failed to save. Check Firebase permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-surface-800 border border-surface-700 rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700">
          <h2 className="font-display font-bold text-lg text-white">
            {editSite ? 'Edit Website' : 'Add New Website'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-surface-700"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="site-name" className="text-sm font-medium text-gray-400">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="site-name"
              type="text"
              className="input"
              placeholder="HobbyWala India"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>

          {/* URL */}
          <div className="space-y-1.5">
            <label htmlFor="site-url" className="text-sm font-medium text-gray-400">
              URL <span className="text-red-400">*</span>
            </label>
            <input
              id="site-url"
              type="text"
              className="input"
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              required
            />
          </div>


          {/* Category */}
          <div className="space-y-1.5">
            <label htmlFor="site-category" className="text-sm font-medium text-gray-400">
              Category
            </label>
            <select
              id="site-category"
              className="input"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-surface-800">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Tags</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all duration-150 active:scale-95 ${
                    form.tags.includes(tag)
                      ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                      : 'bg-surface-700 border-surface-600 text-gray-400 hover:border-surface-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="site-desc" className="text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              id="site-desc"
              className="input resize-none"
              rows={3}
              placeholder="Short description about this website..."
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              className={`w-10 h-6 rounded-full border-2 transition-all duration-200 relative ${
                form.featured
                  ? 'bg-brand-500 border-brand-500'
                  : 'bg-surface-700 border-surface-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.featured ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              Featured listing
            </span>
          </label>
        </form>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-surface-700">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            id="site-form-submit"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <FiLoader size={16} className="animate-spin" />
            ) : (
              <FiPlus size={16} />
            )}
            {loading ? 'Saving...' : editSite ? 'Save Changes' : 'Add Website'}
          </button>
        </div>
      </div>
    </div>
  );
}
