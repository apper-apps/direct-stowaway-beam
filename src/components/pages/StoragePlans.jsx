import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { storagePlanService } from '@/services/api/storagePlanService'

const StoragePlans = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPlan, setCurrentPlan] = useState('small')
  
  useEffect(() => {
    loadPlans()
  }, [])
  
  const loadPlans = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await storagePlanService.getAll()
      setPlans(data)
    } catch (err) {
      setError('Failed to load storage plans')
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpgrade = (planId) => {
    toast.success('Plan upgrade initiated! We\'ll contact you shortly.')
  }
  
  const getPlanIcon = (size) => {
    switch (size.toLowerCase()) {
      case 'small': return 'Package'
      case 'medium': return 'Archive'
      case 'large': return 'Warehouse'
      default: return 'Package'
    }
  }
  
  const getPlanColor = (size, isCurrent) => {
    if (isCurrent) return 'border-primary-500 bg-primary-50'
    
    switch (size.toLowerCase()) {
      case 'small': return 'border-gray-200 hover:border-primary-300'
      case 'medium': return 'border-gray-200 hover:border-secondary-300'
      case 'large': return 'border-gray-200 hover:border-accent-300'
      default: return 'border-gray-200'
    }
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadPlans} />
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Storage Plans</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Choose the perfect storage plan for your needs. Upgrade or downgrade anytime.
        </p>
      </div>
      
      {/* Current Plan Status */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Plan: Small Storage</h3>
              <p className="text-gray-600">45 cubic feet • $49/month</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">65%</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </Card>
      
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const isCurrent = plan.size.toLowerCase() === currentPlan
          const isPopular = plan.size.toLowerCase() === 'medium'
          
          return (
            <motion.div
              key={plan.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card 
                className={`p-8 border-2 transition-all duration-200 ${getPlanColor(plan.size, isCurrent)} ${
                  isPopular ? 'shadow-elevation' : ''
                }`}
                hover={!isCurrent}
              >
                <div className="text-center space-y-6">
                  {/* Plan Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-primary-600' 
                      : plan.size.toLowerCase() === 'medium'
                      ? 'bg-secondary-100'
                      : plan.size.toLowerCase() === 'large'
                      ? 'bg-accent-100'
                      : 'bg-gray-100'
                  }`}>
                    <ApperIcon 
                      name={getPlanIcon(plan.size)} 
                      className={`w-8 h-8 ${
                        isCurrent 
                          ? 'text-white' 
                          : plan.size.toLowerCase() === 'medium'
                          ? 'text-secondary-600'
                          : plan.size.toLowerCase() === 'large'
                          ? 'text-accent-600'
                          : 'text-gray-600'
                      }`} 
                    />
                  </div>
                  
                  {/* Plan Name */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 capitalize">{plan.size} Storage</p>
                  </div>
                  
                  {/* Price */}
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      ${plan.monthlyPrice}
                    </div>
                    <div className="text-gray-600">per month</div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <ApperIcon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <div className="pt-4">
                    {isCurrent ? (
                      <Button variant="outline" className="w-full" disabled>
                        <ApperIcon name="CheckCircle" size={16} className="mr-2" />
                        Current Plan
                      </Button>
                    ) : (
                      <Button 
                        variant={isPopular ? "secondary" : "primary"} 
                        className="w-full"
                        onClick={() => handleUpgrade(plan.Id)}
                      >
                        <ApperIcon name="ArrowUp" size={16} className="mr-2" />
                        {plan.monthlyPrice > 49 ? 'Upgrade' : 'Downgrade'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
      
      {/* FAQ Section */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your storage plan at any time. Changes take effect on your next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens to my items if I downgrade?</h3>
              <p className="text-gray-600">If you exceed your new storage limit, we'll contact you to arrange pickup of excess items before the change takes effect.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Are there any setup fees?</h3>
              <p className="text-gray-600">No setup fees! You only pay the monthly storage fee. Your first pickup is included with any plan.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do you calculate storage space?</h3>
              <p className="text-gray-600">We measure by cubic feet. Our team will assess your items during pickup and confirm your storage needs.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default StoragePlans