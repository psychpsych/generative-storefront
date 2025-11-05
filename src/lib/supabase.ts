import { createClient } from '@supabase/supabase-js'
import { User, Intent, Suggestion, Click } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database interface for type safety
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'>
        Update: Partial<Omit<User, 'id'>>
      }
      intents: {
        Row: Intent
        Insert: Omit<Intent, 'id' | 'timestamp'>
        Update: Partial<Omit<Intent, 'id'>>
      }
      suggestions: {
        Row: Suggestion
        Insert: Omit<Suggestion, 'id' | 'created_at'>
        Update: Partial<Omit<Suggestion, 'id'>>
      }
      clicks: {
        Row: Click
        Insert: Omit<Click, 'id' | 'timestamp'>
        Update: Partial<Omit<Click, 'id'>>
      }
    }
  }
}

// Helper functions for database operations
export const dbOperations = {
  // User operations
  async createUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert({ id: userId })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    }
    return data
  },

  async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    return data
  },

  // Intent operations
  async createIntent(userId: string, text: string): Promise<Intent | null> {
    const { data, error } = await supabase
      .from('intents')
      .insert({
        user_id: userId,
        text,
        processed: false
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating intent:', error)
      return null
    }
    return data
  },

  async getLastIntent(userId: string): Promise<Intent | null> {
    const { data, error } = await supabase
      .from('intents')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()
    
    if (error) {
      console.error('Error fetching last intent:', error)
      return null
    }
    return data
  },

  async updateIntent(intentId: string, updates: Partial<Intent>): Promise<Intent | null> {
    const { data, error } = await supabase
      .from('intents')
      .update(updates)
      .eq('id', intentId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating intent:', error)
      return null
    }
    return data
  },

  // Suggestion operations
  async createSuggestion(intentId: string, suggestions: any[]): Promise<Suggestion | null> {
    const { data, error } = await supabase
      .from('suggestions')
      .insert({
        intent_id: intentId,
        json_data: suggestions
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating suggestion:', error)
      return null
    }
    return data
  },

  // Click tracking
  async trackClick(suggestionId: string, productIndex: number, userId: string): Promise<Click | null> {
    const { data, error } = await supabase
      .from('clicks')
      .insert({
        suggestion_id: suggestionId,
        product_index: productIndex,
        user_id: userId
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error tracking click:', error)
      return null
    }
    return data
  },

  // Analytics
  async getAnalytics() {
    const [intentsResult, clicksResult, usersResult] = await Promise.all([
      supabase.from('intents').select('*', { count: 'exact' }),
      supabase.from('clicks').select('*', { count: 'exact' }),
      supabase.from('users').select('*', { count: 'exact' })
    ])

    const totalIntents = intentsResult.count || 0
    const totalClicks = clicksResult.count || 0
    const totalUsers = usersResult.count || 0

    return {
      total_intents: totalIntents,
      total_clicks: totalClicks,
      total_users: totalUsers,
      ctr: totalIntents > 0 ? (totalClicks / totalIntents) * 100 : 0
    }
  }
}