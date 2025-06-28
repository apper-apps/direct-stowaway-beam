import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StatCard from '@/components/molecules/StatCard'
import ItemCard from '@/components/molecules/ItemCard'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { itemService } from '@/services/api/itemService'
import { pickupService } from '@/services/api/pickupService'

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadDashboardData()
  }, [])
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      const [itemsData, pickupsData] = await Promise.all([
        itemService.getAll(),
        pickupService.getAll()
      ])
      setItems(itemsData)
      setPickups(pickupsData)
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadDashboardData} />
  
  const recentItems = items.slice(0, 4)
  const upcomingPickups = pickups.filter(p => p.status === 'scheduled').slice(0, 3)
  const storedItems = items.filter(item => item.status === 'stored').length
  const inTransitItems = items.filter(item => item.status === 'in-transit').length
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your stored items and upcoming pickups</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Item
          </Button>
          <Button variant="primary">
            <ApperIcon name="Calendar" size={16} className="mr-2" />
            Schedule Pickup
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Items Stored"
          value={storedItems}
          icon="Package"
          trend="up"
          trendValue="+3 this month"
        />
        <StatCard
          title="In Transit"
          value={inTransitItems}
          icon="Truck"
          trend="down"
          trendValue="-1 this week"
        />
        <StatCard
          title="Storage Used"
          value="65%"
          icon="Archive"
        />
        <StatCard
          title="Monthly Cost"
          value="$89"
          icon="DollarSign"
          gradient
        />
      </div>
      
      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="justify-start p-4 h-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Upload" className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Schedule Pickup</div>
                <div className="text-sm text-gray-500">Book a collection</div>
              </div>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start p-4 h-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Download" className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Request Delivery</div>
                <div className="text-sm text-gray-500">Get items back</div>
              </div>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start p-4 h-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Camera" className="w-5 h-5 text-accent-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Add Photos</div>
                <div className="text-sm text-gray-500">Update inventory</div>
              </div>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start p-4 h-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="CreditCard" className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Upgrade Plan</div>
                <div className="text-sm text-gray-500">More storage</div>
              </div>
            </div>
          </Button>
        </div>
      </Card>
      
      {/* Recent Items & Upcoming Pickups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Items</h2>
            <Button variant="ghost" size="sm">
              View All
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentItems.map((item) => (
                <ItemCard key={item.Id} item={item} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <ApperIcon name="Package" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
              <p className="text-gray-600 mb-4">Start by scheduling your first pickup</p>
              <Button variant="primary">
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add First Item
              </Button>
            </Card>
          )}
        </div>
        
        {/* Upcoming Pickups */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Pickups</h2>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Calendar" size={16} />
            </Button>
          </div>
          
          <Card className="p-6">
            {upcomingPickups.length > 0 ? (
              <div className="space-y-4">
                {upcomingPickups.map((pickup) => (
                  <motion.div
                    key={pickup.Id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {new Date(pickup.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">{pickup.timeSlot}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="MoreHorizontal" size={16} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="Calendar" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No upcoming pickups</h3>
                <p className="text-gray-600 text-sm mb-4">Schedule a pickup to get started</p>
                <Button variant="primary" size="sm">
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Schedule Pickup
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard