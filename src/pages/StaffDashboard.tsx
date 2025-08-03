import { useState } from 'react'
import { Search, User, Video, FileText, Eye } from 'lucide-react'
import VimeoManager from '../components/VimeoManager'
import { useAuth } from '../contexts/AuthContext'

export default function StaffDashboard() {
  const { user, users } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'list' | 'player'>('list')
  const [activeTab, setActiveTab] = useState<'players' | 'content' | 'vimeo'>('players')

  // Use created users as players
  const players = users.filter(u => u.user_metadata?.role === 'player').map(u => ({
    id: u.id,
    name: u.user_metadata?.full_name || 'Unknown',
    email: u.email || '',
    position: u.user_metadata?.position || 'Unknown',
    number: parseInt(u.user_metadata?.jersey_number || '0') || 0,
    lastActive: new Date(u.created_at).toLocaleDateString(),
    videosCount: 0,
    statsCount: 0
  }))

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.number.toString().includes(searchTerm)
  )

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player)
    setViewMode('player')
  }

  const PlayerDetailView = () => {
    if (!selectedPlayer) return null

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Player Header */}
        <div className="bg-gradient-to-r from-club-red to-club-red-light rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white bg-opacity-20 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {selectedPlayer.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedPlayer.name}</h1>
                <div className="flex items-center space-x-4 text-red-100">
                  <span>Player ID: {selectedPlayer.id}</span>
                  <span>•</span>
                  <span>Email: {selectedPlayer.email}</span>
                  <span>•</span>
                  <span>#{selectedPlayer.number}</span>
                  <span>•</span>
                  <span>{selectedPlayer.position}</span>
                  <span>•</span>
                  <span>Created: {selectedPlayer.lastActive}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setViewMode('list')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Back to List
            </button>
          </div>
        </div>

        {/* Player Information Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Player Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Position</h4>
              <p className="text-lg text-club-red">{selectedPlayer.position}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Jersey Number</h4>
              <p className="text-lg text-club-red">#{selectedPlayer.number}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
              <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Full Name:</span>
                <span className="ml-2 text-gray-900">{selectedPlayer.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Username:</span>
                <span className="ml-2 text-gray-900">@{selectedPlayer.email.split('@')[0]}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-900">{selectedPlayer.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Content Items:</span>
                <span className="ml-2 text-gray-900">0 items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Content by Season Month */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Player Content</h2>
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content assigned</h3>
            <p className="text-gray-600">Content will appear here when uploaded and assigned to {selectedPlayer.name}</p>
          </div>
        </div>
      </div>
    )
  }

  if (viewMode === 'player') {
    return <PlayerDetailView />
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-club-black to-club-black-light rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
            <p className="text-gray-300">Manage and monitor all player content and performance</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
        <button
          onClick={() => setActiveTab('players')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'players'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <User className="w-4 h-4 mr-2 inline" />
          Players
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'content'
              ? 'bg-white text-club-red shadow-md'
              : 'text-gray-600 hover:text-club-red'
          }`}
        >
          <FileText className="w-4 h-4 mr-2 inline" />
          All Content
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
          Vimeo Library
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'vimeo' && (
        <VimeoManager 
          mode="user" 
          userRole="staff"
          userId={user?.id}
        />
      )}

      {activeTab === 'content' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
            <p className="text-gray-600">Content management functionality will be implemented with Supabase Storage</p>
          </div>
        </div>
      )}

      {activeTab === 'players' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Players Management</h2>
            <span className="text-sm text-gray-600">
              {filteredPlayers.length} players
            </span>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search players by name, position, or number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Players List */}
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No players found' : 'No players created yet'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search criteria'
                  : 'Players will appear here when created by administrators'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="card group cursor-pointer" onClick={() => handlePlayerSelect(player)}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-club-red rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {player.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-club-red transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-sm text-gray-600">#{player.number} • {player.position}</p>
                      <p className="text-xs text-gray-500">{player.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Active
                    </span>
                    <button className="btn-primary py-1 px-3 text-sm group-hover:scale-105 transition-transform">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}