import { useState } from 'react';
import { FiPlus, FiLogOut, FiEdit2, FiTrash2, FiShield } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useWebsites } from '../../hooks/useWebsites';
import { signOut } from '../../firebase/auth';
import { deleteWebsite } from '../../firebase/websites';
import { LoginForm } from './LoginForm';
import { WebsiteForm } from './WebsiteForm';
import { CATEGORY_COLORS } from '../../types';
import type { DiecastWebsite } from '../../types';

export function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { websites, loading: sitesLoading } = useWebsites();
  const [showForm, setShowForm] = useState(false);
  const [editSite, setEditSite] = useState<DiecastWebsite | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    setDeletingId(id);
    try {
      await deleteWebsite(id);
    } catch {
      alert('Failed to delete. Check Firebase permissions.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (site: DiecastWebsite) => {
    setEditSite(site);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditSite(null);
  };

  // Loading auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!isAdmin) {
    return <LoginForm onSuccess={() => {}} />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25">
            <FiShield size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-white">Admin Panel</h1>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            id="admin-add-btn"
            onClick={() => { setEditSite(null); setShowForm(true); }}
            className="btn-primary"
          >
            <FiPlus size={16} />
            Add Website
          </button>
          <button
            id="admin-signout-btn"
            onClick={() => signOut()}
            className="btn-ghost"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Sites', value: websites.length },
          { label: 'Featured', value: websites.filter((s) => s.featured).length },
          { label: 'Categories', value: new Set(websites.map((s) => s.category)).size },
          { label: 'Tags Used', value: new Set(websites.flatMap((s) => s.tags)).size },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <p className="text-2xl font-display font-bold text-gradient">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Listings table */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-700 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">All Listings</h2>
          <span className="text-xs text-gray-500">{websites.length} total</span>
        </div>

        {sitesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No websites added yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mx-auto mt-3 text-sm"
            >
              <FiPlus size={14} />
              Add your first website
            </button>
          </div>
        ) : (
          <div className="divide-y divide-surface-700">
            {websites.map((site) => (
              <div
                key={site.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-700/40 transition-colors"
              >
                {/* Logo */}
                <img
                  src={site.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(site.name.slice(0,2))}&background=f97316&color=fff&bold=true&size=64`}
                  alt={site.name}
                  className="w-9 h-9 rounded-lg border border-surface-600 object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(site.name.slice(0,2))}&background=f97316&color=fff&bold=true&size=64`;
                  }}
                />

                {/* Name + url */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{site.name}</p>
                    {site.featured && (
                      <span className="text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{site.url}</p>
                </div>

                {/* Category */}
                <span className={`tag ${CATEGORY_COLORS[site.category]} border border-gray-800 hidden sm:inline-flex flex-shrink-0`}>
                  {site.category}
                </span>

                {/* Actions */}
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(site)}
                    id={`edit-${site.id}`}
                    title="Edit"
                    className="p-1.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(site.id)}
                    id={`delete-${site.id}`}
                    title="Delete"
                    disabled={deletingId === site.id}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
                  >
                    {deletingId === site.id ? (
                      <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                    ) : (
                      <FiTrash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <WebsiteForm
          editSite={editSite}
          onClose={handleCloseForm}
          onSaved={() => {}}
        />
      )}
    </main>
  );
}
