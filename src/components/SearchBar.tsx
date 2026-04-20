import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <FiSearch
          size={18}
          className="absolute left-3.5 text-gray-500 pointer-events-none"
        />
        <input
          id="search-input"
          type="text"
          placeholder="Search by name, tag, or category..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input pl-10 pr-10 h-12 text-base"
          autoComplete="off"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            id="search-clear"
            className="absolute right-3 text-gray-500 hover:text-white transition-colors"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Result count */}
      {value && (
        <p className="absolute -bottom-6 left-1 text-xs text-gray-500">
          {resultCount === 0
            ? 'No sites found'
            : `${resultCount} site${resultCount !== 1 ? 's' : ''} found`}
        </p>
      )}
    </div>
  );
}
