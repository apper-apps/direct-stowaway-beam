import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ItemCard from '@/components/molecules/ItemCard'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { itemService } from '@/services/api/itemService'

const ItemGrid = () => {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')
  
  const filters = [
    { label: 'Furniture', value: 'furniture' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Documents', value: 'documents' },
    { label: 'Seasonal', value: 'seasonal' },
    { label: 'Sports', value: 'sports' }
  ]
  
  useEffect(() => {
    loadItems()
  }, [])
  
  useEffect(() => {
    filterItems()
  }, [items, searchTerm, selectedFilter])
  
  const loadItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await itemService.getAll()
      setItems(data)
    } catch (err) {
      setError('Failed to load items. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const filterItems = () => {
    let filtered = items
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedFilter) {
      filtered = filtered.filter(item =>
        item.category.toLowerCase() === selectedFilter.toLowerCase()
      )
    }
    
    setFilteredItems(filtered)
  }
  
  const handleRequestDelivery = (item) => {
    toast.success(`Delivery request submitted for ${item.name}`)
  }
  
  if (loading) return <Loading type="items" />
  if (error) return <Error message={error} onRetry={loadItems} />
  
  return (
    <div className="space-y-6">
      <SearchBar
        placeholder="Search your items..."
        onSearch={setSearchTerm}
        showFilters
        filters={filters}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      
      {filteredItems.length === 0 ? (
        <Empty
          title="No items found"
          description={searchTerm || selectedFilter 
            ? "Try adjusting your search or filter criteria" 
            : "Start by adding your first item to storage"
          }
          icon="Package"
          actionLabel="Add First Item"
          onAction={() => toast.info('Add item feature coming soon!')}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ItemCard 
                item={item} 
                onRequestDelivery={handleRequestDelivery}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default ItemGrid