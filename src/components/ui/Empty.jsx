import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No items found", 
  description = "Get started by adding your first item",
  icon = "Package",
  actionLabel = "Add Item",
  onAction,
  showAction = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-64 px-6"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} className="w-12 h-12 text-primary-600" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {showAction && onAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" size={16} />
              <span>{actionLabel}</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Empty