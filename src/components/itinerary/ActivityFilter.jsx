import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const ActivityFilter = ({ activities, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCost, setSelectedCost] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['culture', 'food', 'adventure', 'nature', 'relaxation', 'shopping'];
    const costLevels = ['low', 'medium', 'high'];

    const handleSearch = (term) => {
        setSearchTerm(term);
        applyFilters(term, selectedCategories, selectedCost);
    };

    const handleCategoryToggle = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newCategories);
        applyFilters(searchTerm, newCategories, selectedCost);
    };

    const handleCostToggle = (cost) => {
        const newCost = selectedCost.includes(cost)
            ? selectedCost.filter(c => c !== cost)
            : [...selectedCost, cost];

        setSelectedCost(newCost);
        applyFilters(searchTerm, selectedCategories, newCost);
    };

    const applyFilters = (search, categories, cost) => {
        let filtered = [...activities];

        if (search) {
            filtered = filtered.filter(activity =>
                activity.name.toLowerCase().includes(search.toLowerCase()) ||
                activity.description?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (categories.length > 0) {
            filtered = filtered.filter(activity =>
                activity.tags?.some(tag => categories.includes(tag))
            );
        }

        if (cost.length > 0) {
            filtered = filtered.filter(activity =>
                cost.includes(activity.cost)
            );
        }

        onFilter(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedCost([]);
        onFilter(activities);
    };

    const activeFiltersCount = selectedCategories.length + selectedCost.length;

    return (
        <div className="space-y-4">
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search activities..."
                        className="input-field pl-10"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => handleSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${showFilters || activeFiltersCount > 0
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    <Filter className="w-5 h-5" />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {showFilters && (
                <div className="card animate-slide-down space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Categories</h3>
                            {selectedCategories.length > 0 && (
                                <button
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        applyFilters(searchTerm, [], selectedCost);
                                    }}
                                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryToggle(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategories.includes(category)
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Cost Level</h3>
                            {selectedCost.length > 0 && (
                                <button
                                    onClick={() => {
                                        setSelectedCost([]);
                                        applyFilters(searchTerm, selectedCategories, []);
                                    }}
                                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {costLevels.map(cost => (
                                <button
                                    key={cost}
                                    onClick={() => handleCostToggle(cost)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCost.includes(cost)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {cost === 'low' ? '$' : cost === 'medium' ? '$$' : '$$$'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="w-full py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActivityFilter;
