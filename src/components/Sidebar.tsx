import { useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  HardDrive, 
  Video,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  isMobileMenuOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isMobileMenuOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = user?.user_metadata?.role || 'player'

  // Don't show sidebar for players
  if (userRole === 'player') {
    return null
  }

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      roles: ['staff', 'admin']
    },
    {
      name: 'Players',
      icon: Users,
      path: '/players',
      roles: ['staff', 'admin']
    },
    {
      name: 'Google Drive',
      icon: HardDrive,
      path: '/google-drive',
      roles: ['staff', 'admin']
    },
    {
      name: 'Vimeo Library',
      icon: Video,
      path: '/vimeo',
      roles: ['staff', 'admin']
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  )

  const handleNavigation = (path: string) => {
    navigate(path)
    onClose() // Close mobile menu after navigation
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 z-30">
        <div className="p-6">
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-club-red text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-club-red'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-club-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <span className="font-bold text-gray-900">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-club-red text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-club-red'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}