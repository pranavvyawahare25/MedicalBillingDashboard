import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic } from 'lucide-react';
import { startVoiceSearch } from '@shared/services/search';

interface SearchProps {
  onSearch: (results: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim()) {
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const results = await response.json();
          onSearch(results);
        } catch (error) {
          console.error('Search failed:', error);
        }
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, onSearch]);

  const handleVoiceSearch = () => {
    setIsListening(true);
    startVoiceSearch((transcript) => {
      setQuery(transcript);
      setIsListening(false);
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicines, customers, or doctors..."
          className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          onClick={handleVoiceSearch}
          className={`absolute right-3 top-2.5 p-1 rounded-full ${
            isListening ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Voice search"
        >
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}; 