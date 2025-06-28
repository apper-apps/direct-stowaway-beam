import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { pickupService } from '@/services/api/pickupService'

const Schedule = () => {
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    scheduledDate: '',
    timeSlot: '',
    address: '',
    notes: ''
  })
  
  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM'
  ]
  
  useEffect(() => {
    loadPickups()
  }, [])
  
  const loadPickups = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await pickupService.getAll()
      setPickups(data)
    } catch (err) {
      setError('Failed to load pickups')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newPickup = {
        ...formData,
        items: [],
        status: 'scheduled'
      }
      await pickupService.create(newPickup)
      toast.success('Pickup scheduled successfully!')
      setShowForm(false)
      setFormData({ scheduledDate: '', timeSlot: '', address: '', notes: '' })
      loadPickups()
    } catch (err) {
      toast.error('Failed to schedule pickup')
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return 'Calendar'
      case 'in-progress': return 'Truck'
      case 'completed': return 'CheckCircle'
      default: return 'Clock'
    }
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'in-progress': return 'text-amber-600 bg-amber-100'
      case 'completed': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadPickups} />
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule Pickup</h1>
          <p className="text-gray-600 mt-1">Manage your pickup appointments</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Schedule New Pickup
        </Button>
      </div>
      
      {/* Schedule Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">New Pickup Request</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowForm(false)}
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Pickup Date"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                  required
                />
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Input
                label="Pickup Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter your address"
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                  placeholder="Any special instructions..."
                />
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" variant="primary">
                  <ApperIcon name="Calendar" size={16} className="mr-2" />
                  Schedule Pickup
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
      
      {/* Pickups List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Pickups</h2>
        
        {pickups.length > 0 ? (
          <div className="space-y-4">
            {pickups.map((pickup, index) => (
              <motion.div
                key={pickup.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6" hover>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(pickup.status)}`}>
                        <ApperIcon 
                          name={getStatusIcon(pickup.status)} 
                          className="w-6 h-6" 
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {new Date(pickup.scheduledDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <p className="text-gray-600">{pickup.timeSlot}</p>
                        <p className="text-sm text-gray-500">{pickup.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(pickup.status)}`}>
                        {pickup.status}
                      </span>
                      
                      <Button variant="outline" size="sm">
                        <ApperIcon name="Edit" size={16} className="mr-2" />
                        Edit
                      </Button>
                      
                      {pickup.status === 'scheduled' && (
                        <Button variant="danger" size="sm">
                          <ApperIcon name="X" size={16} className="mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pickups scheduled</h3>
            <p className="text-gray-600 mb-6">Schedule your first pickup to get started</p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Schedule First Pickup
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Schedule