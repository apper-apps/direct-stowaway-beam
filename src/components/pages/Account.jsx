import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  })
  
  const [billingData, setBillingData] = useState({
    cardNumber: '**** **** **** 4567',
    expiryDate: '12/25',
    billingAddress: '123 Main St, New York, NY 10001'
  })
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ]
  
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }
  
  const handleUpdateBilling = () => {
    toast.success('Billing information updated!')
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
              <Input
                label="Primary Address"
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              />
            </div>
            
            <Button variant="primary" onClick={handleSaveProfile}>
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )
        
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <Button variant="outline" size="sm">Change Plan</Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Package" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Small Storage</div>
                  <div className="text-gray-600">$49/month • Next billing: March 15, 2024</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Card Number"
                value={billingData.cardNumber}
                onChange={(e) => setBillingData({...billingData, cardNumber: e.target.value})}
              />
              <Input
                label="Expiry Date"
                value={billingData.expiryDate}
                onChange={(e) => setBillingData({...billingData, expiryDate: e.target.value})}
              />
            </div>
            
            <Input
              label="Billing Address"
              value={billingData.billingAddress}
              onChange={(e) => setBillingData({...billingData, billingAddress: e.target.value})}
            />
            
            <Button variant="primary" onClick={handleUpdateBilling}>
              <ApperIcon name="CreditCard" size={16} className="mr-2" />
              Update Billing
            </Button>
          </div>
        )
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { id: 'pickup', label: 'Pickup Reminders', description: 'Get notified before scheduled pickups' },
                { id: 'delivery', label: 'Delivery Updates', description: 'Notifications about item deliveries' },
                { id: 'billing', label: 'Billing Notifications', description: 'Payment receipts and billing reminders' },
                { id: 'security', label: 'Security Alerts', description: 'Account security and access notifications' }
              ].map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{setting.label}</div>
                    <div className="text-sm text-gray-600">{setting.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
        
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="primary" size="sm">Enable 2FA</Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Active Sessions</h4>
                  <p className="text-sm text-gray-600">Manage devices that are signed in to your account</p>
                </div>
                <Button variant="outline" size="sm">View Sessions</Button>
              </div>
            </Card>
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>
      
      {/* Account Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-600">Member since March 2023</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-sm text-green-600 font-medium">Active Plan</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name={tab.icon} size={20} className="mr-3" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-8">
              {renderTabContent()}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Account