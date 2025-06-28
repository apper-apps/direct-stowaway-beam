import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick,
  gradient = false,
  ...props 
}) => {
  const baseClasses = `
    bg-white rounded-xl shadow-soft border border-gray-100
    ${hover ? 'hover:shadow-elevation transition-all duration-200' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
    ${className}
  `
  
  const CardComponent = onClick ? motion.div : 'div'
  const motionProps = onClick ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}
  
  return (
    <CardComponent
      className={baseClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

export default Card