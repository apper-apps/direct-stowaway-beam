import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const ItemCard = ({ item, onRequestDelivery }) => {
  const navigate = useNavigate()
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'stored': return 'stored'
      case 'in-transit': return 'transit'
      case 'scheduled': return 'scheduled'
      default: return 'default'
    }
  }
  
  const handleCardClick = () => {
    navigate(`/items/${item.Id}`)
  }
  
  const handleDeliveryClick = (e) => {
    e.stopPropagation()
    onRequestDelivery?.(item)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover onClick={handleCardClick} className="p-4 h-full">
        <div className="space-y-4">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {item.photos && item.photos.length > 0 ? (
              <img 
                src={item.photos[0]} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name="Package" className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {item.name}
              </h3>
              <Badge variant={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-600">
              {item.category} • {item.location}
            </p>
            
            {item.storedDate && (
              <p className="text-xs text-gray-500">
                Stored {new Date(item.storedDate).toLocaleDateString()}
              </p>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDeliveryClick}
              className="flex-1 text-xs"
            >
              <ApperIcon name="Truck" size={14} className="mr-1" />
              Request
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ItemCard