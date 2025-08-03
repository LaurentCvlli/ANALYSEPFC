// Types pour l'application Plougastel FC
export interface User {
  id: string
  email: string
  user_metadata: {
    role: 'player' | 'staff' | 'admin'
    full_name: string
    username: string
    position?: string
    jersey_number?: string
  }
  created_at: string
}

export interface ContentItem {
  id: string
  title: string
  type: 'video' | 'document'
  date: string
  url?: string
  isExternal?: boolean
  size?: string
  description?: string
  matchNumber?: string
  uploadDate?: string
  category?: string
  playerName?: string
  assignedTo: string
  isPrivate?: boolean
  authorizedUsers?: string[]
  createdBy?: string
  thumbnail?: string
}

export interface DriveFile {
  id: string
  name: string
  type: 'video' | 'document' | 'folder' | 'image'
  size: string
  modifiedTime: string
  owner: string
  url?: string
  thumbnailUrl?: string
  isExternal?: boolean
  assignedTo?: string[]
  description?: string
  path: string[]
  parentId?: string
  shared?: boolean
  starred?: boolean
  permissions?: {
    canView: string[]
    canEdit: string[]
    canDownload: string[]
  }
}

export interface VimeoVideo {
  id: string
  title: string
  description: string
  embedUrl: string
  thumbnailUrl: string
  duration: string
  uploadDate: string
  month: string
  season: string
  privacy: 'public' | 'private' | 'domain-restricted'
  downloadEnabled: boolean
  views: number
  owner: string
  assignedTo: string[]
  tags: string[]
  quality: string
  size: string
}

export interface CreateUserData {
  fullName: string
  username: string
  email: string
  password: string
  role: 'player' | 'staff' | 'admin'
  position?: string
  jerseyNumber?: string
}