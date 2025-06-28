import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  gradient = false,
  onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        gradient={gradient} 
        hover={!!onClick} 
        onClick={onClick}
        className="p-6"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {value}
            </p>
            {trend && (
              <div className="flex items-center space-x-1">
                <ApperIcon 
                  name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14}
                  className={trend === 'up' ? 'text-green-500' : 'text-red-500'}
                />
                <span className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          
          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
            <ApperIcon name={icon} className="w-7 h-7 text-primary-600" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default StatCard