import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCities } from '../../utils/api';
import { destinations as fallbackDestinations } from '../../data/destinations';

const DestinationSearch = ({ value, onChange }) => {
    const [query, setQuery] = useState(value?.name || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions(fallbackDestinations.slice(0, 5));
                return;
            }

            setIsLoading(true);

            const results = await searchCities(query);

            if (results.length > 0) {
                setSuggestions(results);
            } else {
                const filtered = fallbackDestinations.filter((dest) =>
                    dest.name.toLowerCase().includes(query.toLowerCase()) ||
                    dest.country.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filtered);
            }

            setIsLoading(false);
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleSelect = (destination) => {
        setQuery(destination.name);
        onChange(destination);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <label className="label">Where do you want to go?</label>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search destinations..."
                    className="input-field pl-12"
                />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto animate-slide-down">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : suggestions.length > 0 ? (
                        <div className="py-2">
                            {suggestions.map((dest, index) => (
                                <button
                                    key={`${dest.id}-${index}`}
                                    onClick={() => handleSelect(dest)}
                                    className="w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors flex items-center gap-3"
                                >
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{dest.name}</div>
                                        <div className="text-sm text-gray-500">{dest.country}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No destinations found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DestinationSearch;
