import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Upload, 
  Video, 
  FileText, 
  TrendingUp,
  Settings,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import VimeoManager from '../components/VimeoManager'
import { CreateUserData } from '../types'

export default function AdminDashboard() {
  const { user, createUser, users, loadUsers } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'vimeo'>('overview')
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  // User creation form state
  const [formData, setFormData] = useState<CreateUserData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'player',
    position: '',
    jerseyNumber: ''
  })

  // Content upload form state
  const [contentFormData, setContentFormData] = useState({
    title: '',
    description: '',
    type: 'video' as 'video' | 'document',
    date: '',
    matchNumber: '',
    assignedTo: 'all',
    url: '',
    size: '',
    isPrivate: false,
    authorizedUsers: ''
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const handleInputChange = (field: keyof CreateUserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContentInputChange = (field: string, value: any) => {
    setContentFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    
    try {
      await createUser(formData)
      
      // Reset form
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: 'player',
        position: '',
        jerseyNumber: ''
      })
      
      setShowCreateUser(false)
    } catch (error: any) {
      console.error('Error creating user:', error)
      alert('Error creating user: ' + error.message)
    } finally {
      setIsCreating(false)
    }
  }

  const handleContentUpload = (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Implement content upload to Supabase
    console.log('Content upload:', contentFormData)
    
    // Reset form
    setContentFormData({
      title: '',
      description: '',
      type: 'video',
      date: '',
      matchNumber: '',
      assignedTo: 'all',
      url: '',
      size: '',
      isPrivate: false,
      authorizedUsers: ''
    })
    
    setShowUploadModal(false)
  }

  const filteredUsers = users.filter(user =>
    user.user_metadata?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_metadata?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_metadata?.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-club-red to-club-red-light rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-red-100">Manage users, content, and platform settings</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'overview'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-2 inline" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'users'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <Users className="w-4 h-4 mr-2 inline" />
          Users
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'content'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <Upload className="w-4 h-4 mr-2 inline" />
          Content
        </button>
        <button
          onClick={() => setActiveTab('vimeo')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'vimeo'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <Video className="w-4 h-4 mr-2 inline" />
          Vimeo
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {users.length} users registered
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Content management available
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="w-full btn-primary text-left"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New User
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full btn-outline text-left"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <button
              onClick={() => setShowCreateUser(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <span className="text-sm text-gray-600">
              {filteredUsers.length} of {users.length} users
            </span>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No users found' : 'No users created yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Try adjusting your search criteria'
                  : 'Create your first user to get started'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First User
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="card group">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-club-red rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.user_metadata?.full_name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-600">@{user.user_metadata?.username || 'unknown'}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.user_metadata?.role === 'player' 
                            ? 'bg-green-100 text-green-800' 
                            : user.user_metadata?.role === 'staff'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {user.user_metadata?.role || 'unknown'}
                        </span>
                        {user.user_metadata?.role === 'player' && user.user_metadata?.jersey_number && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-club-red text-white rounded-full">
                            #{user.user_metadata.jersey_number}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.user_metadata?.role === 'player' && user.user_metadata?.position && (
                      <p><strong>Position:</strong> {user.user_metadata.position}</p>
                    )}
                    <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Content
            </button>
          </div>

          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
            <p className="text-gray-600 mb-4">Content upload functionality will be implemented with Supabase Storage</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary"
            >
              <Upload className="w-4 h-4 mr-2" />
              Configure Upload
            </button>
          </div>
        </div>
      )}

      {activeTab === 'vimeo' && (
        <VimeoManager mode="admin" userRole="admin" userId={user?.id} />
      )}

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New User</h3>
              <button
                onClick={() => setShowCreateUser(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="player">Player</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {formData.role === 'player' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      required
                      className="input-field"
                    >
                      <option value="">Select position</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Defender">Defender</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Forward">Forward</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jersey Number *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={formData.jerseyNumber}
                      onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                      required
                      className="input-field"
                      placeholder="Enter jersey number"
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="btn-primary flex-1"
                >
                  {isCreating ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create User
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateUser(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Content Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Upload Content</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleContentUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={contentFormData.title}
                  onChange={(e) => handleContentInputChange('title', e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={contentFormData.description}
                  onChange={(e) => handleContentInputChange('description', e.target.value)}
                  rows={3}
                  className="input-field resize-vertical"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type *
                  </label>
                  <select
                    value={contentFormData.type}
                    onChange={(e) => handleContentInputChange('type', e.target.value)}
                    required
                    className="input-field"
                  >
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={contentFormData.date}
                    onChange={(e) => handleContentInputChange('date', e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Drive URL
                </label>
                <input
                  type="url"
                  value={contentFormData.url}
                  onChange={(e) => handleContentInputChange('url', e.target.value)}
                  className="input-field"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Match Number
                </label>
                <input
                  type="text"
                  value={contentFormData.matchNumber}
                  onChange={(e) => handleContentInputChange('matchNumber', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Match 1, Training Session 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To *
                </label>
                <select
                  value={contentFormData.assignedTo}
                  onChange={(e) => handleContentInputChange('assignedTo', e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="all">All Users</option>
                  <option value="players">All Players</option>
                  <option value="staff">Staff Only</option>
                  {users.filter(u => u.user_metadata?.role === 'player').map(player => (
                    <option key={player.id} value={player.id}>
                      {player.user_metadata?.full_name} (Player)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={contentFormData.isPrivate}
                  onChange={(e) => handleContentInputChange('isPrivate', e.target.checked)}
                  className="rounded border-gray-300 text-club-red focus:ring-club-red"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Mark as private content
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Content
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}