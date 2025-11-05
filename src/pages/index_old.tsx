import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import IntentInput from '@/components/IntentInput'
import SuggestionsGrid from '@/components/SuggestionsGrid'
import DynamicLayout from '@/components/DynamicLayout'
import ShoppingJourney from '@/components/ShoppingJourney'
import { CRMService } from '@/lib/crmService'
import { ProductSuggestion, ChatGPTResponse } from '@/types'

interface HomeState {
  userId: string
  suggestions: ProductSuggestion[]
  moodAnalysis?: string
  confidenceScore?: number
  isLoading: boolean
  error?: string
  hasSearched: boolean
  userIntent?: string
  layoutStyle?: string
  experienceTheme?: string
  narrative?: string
  colorPalette?: string[]
  personalizedGreeting?: string
  customerInsights?: any
  currentSession: {
    searches: string[]
    clicks: any[]
    startTime: number
    totalTime: number
  }
}

const Home: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    userId: '',
    suggestions: [],
    isLoading: false,
    hasSearched: false,
    currentSession: {
      searches: [],
      clicks: [],
      startTime: Date.now(),
      totalTime: 0
    }
  })

  // Initialize user ID and load CRM data on mount
  useEffect(() => {
    let userId = localStorage.getItem('generative-storefront-user-id')
    if (!userId) {
      userId = uuidv4()
      localStorage.setItem('generative-storefront-user-id', userId)
    }
    
    // Load CRM insights for personalization
    const insights = CRMService.generateInsights(userId)
    
    setState(prev => ({ 
      ...prev, 
      userId,
      personalizedGreeting: insights.personalizedGreeting,
      customerInsights: insights
    }))
  }, [])

  const handleIntentSubmit = async (intent: string) => {
    if (!state.userId) return

    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: undefined,
      hasSearched: true,
      userIntent: intent
    }))

    try {
      const response = await fetch('/api/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent,
          userId: state.userId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get suggestions')
      }

      const data: ChatGPTResponse = await response.json()
      
      setState(prev => ({
        ...prev,
        suggestions: data.suggestions || [],
        moodAnalysis: data.mood_analysis,
        confidenceScore: data.confidence_score,
        layoutStyle: data.layout_style,
        experienceTheme: data.experience_theme,
        narrative: data.narrative,
        colorPalette: data.color_palette,
        isLoading: false
      }))

    } catch (error) {
      console.error('Error getting suggestions:', error)
      setState(prev => ({
        ...prev,
        error: 'Sorry, we couldn\'t process your request. Please try again.',
        isLoading: false
      }))
    }
  }

  const handleProductClick = async (suggestion: ProductSuggestion, index: number) => {
    // Track click analytics
    if (state.userId) {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            suggestionId: suggestion.id,
            productIndex: index,
            userId: state.userId
          }),
        })
      } catch (error) {
        console.error('Error tracking click:', error)
      }
    }

    // For MVP, just log the click
    console.log('Product clicked:', suggestion)
    // In a real app, this would navigate to product detail page
  }

  const handleRefresh = () => {
    setState(prev => ({
      ...prev,
      suggestions: [],
      hasSearched: false,
      moodAnalysis: undefined,
      confidenceScore: undefined,
      userIntent: undefined,
      layoutStyle: undefined,
      experienceTheme: undefined,
      narrative: undefined,
      colorPalette: undefined
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              Generative Storefront
            </div>
            <div className="text-sm text-gray-600">
              Powered by AI
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        {!state.hasSearched ? (
          /* Landing Page with Intent Input */
          <div className="flex items-center justify-center min-h-[60vh]">
            <IntentInput 
              onSubmit={handleIntentSubmit}
              isLoading={state.isLoading}
              personalizedGreeting={state.personalizedGreeting}
              customerInsights={state.customerInsights}
            />
          </div>
        ) : (
          /* Results Page */
          <div className="space-y-8">
            {/* Back to Search */}
            <div className="max-w-6xl mx-auto">
              <button
                onClick={handleRefresh}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                ← New Search
              </button>
            </div>

            {/* Error State */}
            {state.error && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-600">{state.error}</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-2 btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Suggestions with Dynamic Layout */}
            {state.layoutStyle && state.userIntent ? (
              <DynamicLayout
                suggestions={state.suggestions}
                moodAnalysis={state.moodAnalysis || ''}
                userIntent={state.userIntent}
                layoutStyle={state.layoutStyle as any}
                onProductClick={handleProductClick}
              />
            ) : (
              <SuggestionsGrid
                suggestions={state.suggestions}
                moodAnalysis={state.moodAnalysis}
                confidenceScore={state.confidenceScore}
                onProductClick={handleProductClick}
                onRefresh={handleRefresh}
                isLoading={state.isLoading}
              />
            )}
          </div>
        )}
        
        {/* Shopping Journey Component */}
        {state.hasSearched && state.suggestions.length > 0 && (
          <ShoppingJourney
            userId={state.userId}
            currentSession={state.currentSession}
            onNewSearch={handleRefresh}
            onEndSession={() => {
              // Handle session end - redirect or show thank you
              console.log('Session ended')
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Generative Storefront. Bringing emotion and intuition back to online shopping.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            MVP • Built with Next.js, OpenAI, and Supabase
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home