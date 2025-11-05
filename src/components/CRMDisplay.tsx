import React, { useState, useEffect } from 'react'

interface CRMData {
  name: string
  age: number
  location: string
  loyaltyTier: string
  totalSpent: number
  orderCount: number
  stylePersonality: string[]
  recentMood: string
  confidenceLevel: number
  energyPreference: string
  lifestyleSegment: string
  preferredBrands: string[]
  wishlistItems: string[]
  recentSearches: string[]
}

interface CRMDisplayProps {
  userId?: string
  onUserSwitch?: (userId: string) => void
}

const CRMDisplay: React.FC<CRMDisplayProps> = ({ userId = 'user_001', onUserSwitch }) => {
  const [crmData, setCrmData] = useState<CRMData | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch CRM data
    fetchCRMData()
  }, [userId])

  const fetchCRMData = async () => {
    try {
      setLoading(true)
      // Get the base URL for API calls
      const baseURL = process.env.NODE_ENV === 'production' 
        ? `https://${window.location.hostname}` 
        : '';
      
      // Simulate API call - in real app this would be an actual API endpoint
      const response = await fetch(`${baseURL}/api/crm/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCrmData(data)
      } else {
        // Fallback to mock data for demo
        setCrmData(getMockCRMData(userId))
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error)
      // Fallback to mock data
      setCrmData(getMockCRMData(userId))
    } finally {
      setLoading(false)
    }
  }

  const getMockCRMData = (userId: string): CRMData => {
    const mockData = {
      'user_001': {
        name: 'Sofia Chen',
        age: 29,
        location: 'New York',
        loyaltyTier: 'Gold',
        totalSpent: 2847.50,
        orderCount: 12,
        stylePersonality: ['minimalist', 'professional', 'confident'],
        recentMood: 'confident',
        confidenceLevel: 8,
        energyPreference: 'energizing',
        lifestyleSegment: 'Urban Professional',
        preferredBrands: ['Everlane', 'Ganni', 'Theory'],
        wishlistItems: ['Merino Wool Blazer', 'Classic Leather Handbag'],
        recentSearches: ['professional blazer', 'work shoes', 'weekend casual']
      },
      'user_002': {
        name: 'Emma Rodriguez',
        age: 24,
        location: 'Los Angeles',
        loyaltyTier: 'Silver',
        totalSpent: 1289.75,
        orderCount: 8,
        stylePersonality: ['bohemian', 'creative', 'free-spirited'],
        recentMood: 'creative',
        confidenceLevel: 6,
        energyPreference: 'calm',
        lifestyleSegment: 'Creative Millennials',
        preferredBrands: ['Free People', 'Urban Outfitters'],
        wishlistItems: ['Flowy Maxi Dress', 'Vintage Band T-Shirt'],
        recentSearches: ['bohemian dress', 'festival outfit', 'vintage tee']
      },
      'user_003': {
        name: 'Isabella Park',
        age: 35,
        location: 'Paris',
        loyaltyTier: 'Platinum',
        totalSpent: 5247.80,
        orderCount: 18,
        stylePersonality: ['sophisticated', 'elegant', 'luxury'],
        recentMood: 'sophisticated',
        confidenceLevel: 9,
        energyPreference: 'neutral',
        lifestyleSegment: 'Luxury Consumer',
        preferredBrands: ['Celine', 'Bottega Veneta', 'Mejuri'],
        wishlistItems: ['Classic Leather Handbag', 'Gold Statement Earrings'],
        recentSearches: ['luxury handbag', 'statement earrings', 'work outfit']
      }
    }
    
    return mockData[userId as keyof typeof mockData] || mockData['user_001']
  }

  const switchUser = (newUserId: string) => {
    setCrmData(getMockCRMData(newUserId))
    console.log(`🔄 CRM Display: Switching to user ${newUserId}`)
    // Call parent callback to update the active user in main app
    if (onUserSwitch) {
      onUserSwitch(newUserId)
      console.log(`✅ CRM Display: Called onUserSwitch with ${newUserId}`)
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-gray-800 bg-gray-100'
      case 'Gold': return 'text-yellow-800 bg-yellow-100'
      case 'Silver': return 'text-gray-600 bg-gray-50'
      default: return 'text-bronze-600 bg-bronze-50'
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'confident': return '💪'
      case 'creative': return '🎨'
      case 'sophisticated': return '💎'
      case 'cozy': return '🏠'
      case 'elegant': return '✨'
      default: return '😊'
    }
  }

  if (loading) {
    return (
      <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    )
  }

  if (!crmData) return null

  return (
    <div className={`fixed bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-12 h-12' : 'w-80 max-h-96 overflow-y-auto'
    }`}>
      
      {/* Header with toggle */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">CRM Profile</span>
          </div>
        )}
        <button className="text-gray-400 hover:text-gray-600">
          {isCollapsed ? '👤' : '−'}
        </button>
      </div>

      {/* CRM Content */}
      {!isCollapsed && (
        <div className="px-3 pb-3 space-y-3">
          
          {/* User Switcher */}
          <div className="flex space-x-1">
            {['user_001', 'user_002', 'user_003'].map((id, index) => (
              <button
                key={id}
                onClick={() => switchUser(id)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  userId === id ? 'bg-purple-100 text-purple-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                User {index + 1}
              </button>
            ))}
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">{crmData.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getTierColor(crmData.loyaltyTier)}`}>
                {crmData.loyaltyTier}
              </span>
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Age:</span>
                <span>{crmData.age} • {crmData.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span className="font-medium">${crmData.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Orders:</span>
                <span>{crmData.orderCount}</span>
              </div>
            </div>
          </div>

          {/* Current Mood & Preferences */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getMoodEmoji(crmData.recentMood)}</span>
              <span className="text-xs text-gray-600">
                Mood: <span className="font-medium capitalize">{crmData.recentMood}</span>
              </span>
            </div>
            
            <div className="text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Confidence:</span>
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < crmData.confidenceLevel ? 'bg-purple-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs">{crmData.confidenceLevel}/10</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span>Energy:</span>
                <span className="capitalize">{crmData.energyPreference}</span>
              </div>
            </div>
          </div>

          {/* Style Profile */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Style Profile</h4>
            <div className="flex flex-wrap gap-1">
              {crmData.stylePersonality.map((style) => (
                <span
                  key={style}
                  className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-md"
                >
                  {style}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500">{crmData.lifestyleSegment}</div>
          </div>

          {/* Preferred Brands */}
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-700">Preferred Brands</h4>
            <div className="text-xs text-gray-600">
              {crmData.preferredBrands.slice(0, 3).join(', ')}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-700">Recent Searches</h4>
            <div className="text-xs text-gray-600 space-y-1">
              {crmData.recentSearches.slice(0, 2).map((search, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist */}
          {crmData.wishlistItems.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-gray-700">Wishlist</h4>
              <div className="text-xs text-gray-600 space-y-1">
                {crmData.wishlistItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span className="text-red-400">♥</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default CRMDisplay