import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { itemService } from '@/services/api/itemService'

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  
  useEffect(() => {
    loadItem()
  }, [id])
  
  const loadItem = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await itemService.getById(parseInt(id))
      setItem(data)
    } catch (err) {
      setError('Failed to load item details')
    } finally {
      setLoading(false)
    }
  }
  
  const handleRequestDelivery = () => {
    toast.success(`Delivery request submitted for ${item.name}`)
  }
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'stored': return 'stored'
      case 'in-transit': return 'transit'
      case 'scheduled': return 'scheduled'
      default: return 'default'
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadItem} />
  if (!item) return <Error message="Item not found" showRetry={false} />
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/items')}
        >
          <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
          Back to Items
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant={getStatusColor(item.status)}>
              {item.status}
            </Badge>
            <span className="text-gray-600">{item.category}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">{item.location}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Photos */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos</h2>
            
            {item.photos && item.photos.length > 0 ? (
              <div className="space-y-4">
                {/* Main Photo */}
                <motion.div
                  key={selectedPhoto}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={item.photos[selectedPhoto]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Photo Thumbnails */}
                {item.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {item.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedPhoto === index ? 'border-primary-500' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${item.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="Camera" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No photos available</p>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Item Details */}
        <div className="space-y-6">
          {/* Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={handleRequestDelivery}
              >
                <ApperIcon name="Truck" size={16} className="mr-2" />
                Request Delivery
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="Camera" size={16} className="mr-2" />
                Add Photos
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="Edit" size={16} className="mr-2" />
                Edit Details
              </Button>
            </div>
          </Card>
          
          {/* Item Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900">{item.category}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Storage Location</span>
                <span className="font-medium text-gray-900">{item.location}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date Stored</span>
                <span className="font-medium text-gray-900">
                  {new Date(item.storedDate).toLocaleDateString()}
                </span>
              </div>
              
              {item.dimensions && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-medium text-gray-900">
                    {item.dimensions.length}" × {item.dimensions.width}" × {item.dimensions.height}"
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge variant={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </div>
          </Card>
          
          {/* Notes */}
          {item.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <p className="text-gray-700 leading-relaxed">{item.notes}</p>
            </Card>
          )}
          
          {/* Storage History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage History</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Item Stored</div>
                  <div className="text-sm text-gray-600">
                    {new Date(item.storedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="Truck" className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Pickup Completed</div>
                  <div className="text-sm text-gray-600">
                    {new Date(item.storedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail