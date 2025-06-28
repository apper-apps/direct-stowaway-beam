import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const NavItem = ({ to, icon, children, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
        ${isActive 
          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft' 
          : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
        }
      `}
    >
      <ApperIcon 
        name={icon} 
        size={20} 
        className="mr-3 group-hover:scale-110 transition-transform duration-200" 
      />
      <span className="font-medium">{children}</span>
      {badge && (
        <span className="ml-auto bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

export default NavItem