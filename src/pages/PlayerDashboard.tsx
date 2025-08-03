import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import { Calendar, Video, FileText, Trophy } from 'lucide-react'

const PlayerDashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tableau de bord - Joueur
          </h1>
          <p className="text-gray-600">
            Bienvenue {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Calendrier</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Consultez les prochains matchs et entraînements
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Voir le calendrier
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Video className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Vidéos</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Accédez aux analyses vidéo et contenus d'entraînement
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Voir les vidéos
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Consultez les documents et ressources du club
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              Voir les documents
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Statistiques</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Suivez vos performances et statistiques
            </p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors">
              Voir les stats
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <p className="text-gray-900">
                {user?.user_metadata?.full_name || 'Non renseigné'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <p className="text-gray-900">
                {user?.user_metadata?.position || 'Non renseignée'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de maillot
              </label>
              <p className="text-gray-900">
                {user?.user_metadata?.jersey_number || 'Non assigné'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PlayerDashboard