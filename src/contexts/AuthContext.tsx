import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, supabaseAdmin } from '../lib/supabase'
import { CreateUserData } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  createUser: (userData: CreateUserData) => Promise<{ user: User }>
  users: User[]
  loadUsers: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Compte admin hardcodé
    if (email === 'LPasquier49' && password === 'PFCR1Admin') {
      // Simuler une connexion admin réussie
      const adminUser = {
        id: 'admin-hardcoded',
        email: 'LPasquier49',
        user_metadata: {
          role: 'admin',
          full_name: 'Laurent Pasquier',
          username: 'LPasquier49'
        },
        created_at: new Date().toISOString()
      }
      setUser(adminUser as any)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const createUser = async (userData: CreateUserData) => {
    if (!supabaseAdmin) {
      throw new Error('Admin client not available. Please configure VITE_SUPABASE_SERVICE_ROLE_KEY')
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      user_metadata: {
        role: userData.role,
        full_name: userData.fullName,
        username: userData.username,
        position: userData.position,
        jersey_number: userData.jerseyNumber,
      },
      email_confirm: false
    })

    if (error) throw error
    
    // Reload users list
    await loadUsers()
    return data
  }

  const loadUsers = async () => {
    if (!supabaseAdmin) return

    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    if (error) {
      console.error('Error loading users:', error)
      return
    }
    
    setUsers(data.users || [])
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    createUser,
    users,
    loadUsers
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}