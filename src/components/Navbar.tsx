import { Link, useLocation } from 'react-router-dom';
import { FaCar, FaShieldAlt } from 'react-icons/fa';

interface NavbarProps {
  pinCount: number;
}

export function Navbar({ pinCount }: NavbarProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 bg-surface-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            <FaCar size={20} className="text-surface-950 relative z-10" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-black text-white text-xl tracking-tighter uppercase">
                DIECAST
              </span>
              <span className="font-display font-black text-brand-500 text-xl tracking-tighter uppercase">
                HUB
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">
              Website Collection
            </span>
          </div>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Pin count indicator */}
          {pinCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">{pinCount} Saved</span>
            </div>
          )}

          {/* Admin link */}
          <Link
            to={isAdmin ? '/' : '/admin'}
            id="admin-nav-link"
            className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border transition-all duration-500 ${
              isAdmin
                ? 'bg-brand-500 border-brand-500 text-surface-950'
                : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10'
            }`}
          >
            <FaShieldAlt size={14} />
            {isAdmin ? 'Exit Panel' : 'Dashboard'}
          </Link>
        </div>
      </div>
    </header>
  );
}
