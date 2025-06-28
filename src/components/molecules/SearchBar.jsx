import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'

const SearchBar = ({ 
  placeholder = "Search items...", 
  onSearch, 
  className = '',
  showFilters = false,
  filters = [],
  selectedFilter = '',
  onFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch?.(value)
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
        />
      </div>
      
      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange?.('')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === '' 
                ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange?.(filter.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.value 
                  ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar