import ApperIcon from '@/components/ApperIcon'

const Badge = ({ children, variant = 'default', icon, className = '' }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    stored: "bg-green-100 text-green-800",
    transit: "bg-amber-100 text-amber-800",
    scheduled: "bg-blue-100 text-blue-800"
  }
  
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  const classes = `${baseClasses} ${variants[variant]} ${className}`
  
  return (
    <span className={classes}>
      {icon && <ApperIcon name={icon} size={12} className="mr-1" />}
      {children}
    </span>
  )
}

export default Badge