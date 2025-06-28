import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import NavItem from '@/components/molecules/NavItem'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { to: '/', icon: 'LayoutDashboard', label: 'Dashboard' },
    { to: '/items', icon: 'Package', label: 'My Items' },
    { to: '/schedule', icon: 'Calendar', label: 'Schedule' },
    { to: '/plans', icon: 'CreditCard', label: 'Storage Plans' },
    { to: '/account', icon: 'User', label: 'Account' }
  ]
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Package" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                StowAway
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon}
              >
                {item.label}
              </NavItem>
            ))}
          </nav>
          
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Item
            </Button>
            <Button variant="primary" size="sm">
              <ApperIcon name="Truck" size={16} className="mr-2" />
              Schedule Pickup
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <ApperIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 py-4 space-y-2"
            >
              {navItems.map((item) => (
                <NavItem 
                  key={item.to} 
                  to={item.to} 
                  icon={item.icon}
                >
                  {item.label}
                </NavItem>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Add Item
                </Button>
                <Button variant="primary" size="sm" className="w-full">
                  <ApperIcon name="Truck" size={16} className="mr-2" />
                  Schedule Pickup
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header