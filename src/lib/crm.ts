// CRM Service - Dummy user data for personalization
export interface UserCRMProfile {
  id: string
  name: string
  email: string
  age: number
  location: string
  memberSince: string
  totalSpent: number
  orderCount: number
  avgOrderValue: number
  preferredCategories: string[]
  preferredBrands: string[]
  stylePersonality: string[]
  moodHistory: Array<{
    date: string
    mood: string
    context: string
  }>
  sizingProfile: {
    clothing: string
    shoes: string
  }
  lifestyleSegment: string
  confidenceLevel: number
  energyPreference: 'calm' | 'neutral' | 'energizing'
  shoppingMotivations: string[]
  recentSearches: string[]
  wishlistItems: string[]
  lastActivity: string
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
}

export interface PersonalizationData {
  recommendedStyles: string[]
  priceRange: { min: number; max: number }
  seasonalPreferences: string[]
  occasionFrequency: { [occasion: string]: number }
  colorPreferences: string[]
  materialPreferences: string[]
  currentMoodScore: number
  confidenceTrend: 'increasing' | 'stable' | 'declining'
}

export interface UserInsights {
  customerSegment: string
  personalityProfile: string
  shoppingPattern: string
  emotionalTriggers: string[]
  nextPurchasePrediction: {
    category: string
    confidence: number
    timeframe: string
  }
  recommendationReasons: string[]
}

// Dummy CRM Data
const dummyUsers: UserCRMProfile[] = [
  {
    id: 'user_001',
    name: 'Sofia Chen',
    email: 'sofia.chen@email.com',
    age: 29,
    location: 'New York',
    memberSince: '2023-03-15',
    totalSpent: 2847.50,
    orderCount: 12,
    avgOrderValue: 237.29,
    preferredCategories: ['clothing', 'accessories', 'shoes'],
    preferredBrands: ['Everlane', 'Ganni', 'Theory'],
    stylePersonality: ['minimalist', 'professional', 'confident'],
    moodHistory: [
      { date: '2024-11-01', mood: 'confident', context: 'big presentation coming up' },
      { date: '2024-10-28', mood: 'cozy', context: 'rainy weekend at home' },
      { date: '2024-10-25', mood: 'elegant', context: 'dinner date planned' },
      { date: '2024-10-22', mood: 'creative', context: 'art gallery opening' },
      { date: '2024-10-18', mood: 'confident', context: 'job interview preparation' }
    ],
    sizingProfile: {
      clothing: 'M',
      shoes: '8'
    },
    lifestyleSegment: 'Urban Professional',
    confidenceLevel: 8,
    energyPreference: 'energizing',
    shoppingMotivations: ['career advancement', 'self-expression', 'confidence boost'],
    recentSearches: [
      'professional blazer for presentation',
      'comfortable work shoes',
      'weekend casual outfit'
    ],
    wishlistItems: ['Merino Wool Blazer', 'Classic Leather Handbag', 'White Leather Sneakers'],
    lastActivity: '2024-11-04T15:30:00Z',
    loyaltyTier: 'Gold'
  },
  {
    id: 'user_002',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    age: 24,
    location: 'Los Angeles',
    memberSince: '2024-01-20',
    totalSpent: 1289.75,
    orderCount: 8,
    avgOrderValue: 161.22,
    preferredCategories: ['clothing', 'accessories'],
    preferredBrands: ['Free People', 'Urban Outfitters', 'Jacquemus'],
    stylePersonality: ['bohemian', 'creative', 'free-spirited'],
    moodHistory: [
      { date: '2024-11-02', mood: 'creative', context: 'music festival this weekend' },
      { date: '2024-10-30', mood: 'cozy', context: 'Netflix night with friends' },
      { date: '2024-10-26', mood: 'adventurous', context: 'hiking trip planned' },
      { date: '2024-10-20', mood: 'romantic', context: 'anniversary dinner' },
      { date: '2024-10-15', mood: 'playful', context: 'beach day with friends' }
    ],
    sizingProfile: {
      clothing: 'S',
      shoes: '7'
    },
    lifestyleSegment: 'Creative Millennials',
    confidenceLevel: 6,
    energyPreference: 'calm',
    shoppingMotivations: ['artistic expression', 'comfort', 'uniqueness'],
    recentSearches: [
      'bohemian maxi dress',
      'vintage band t-shirt',
      'comfortable festival outfit'
    ],
    wishlistItems: ['Flowy Maxi Dress', 'Vintage Band T-Shirt', 'Canvas Tote Bag'],
    lastActivity: '2024-11-03T09:45:00Z',
    loyaltyTier: 'Silver'
  },
  {
    id: 'user_003',
    name: 'Isabella Park',
    email: 'isabella.park@email.com',
    age: 35,
    location: 'Paris',
    memberSince: '2022-08-10',
    totalSpent: 5247.80,
    orderCount: 18,
    avgOrderValue: 291.54,
    preferredCategories: ['accessories', 'shoes', 'clothing'],
    preferredBrands: ['Celine', 'Bottega Veneta', 'Mejuri'],
    stylePersonality: ['sophisticated', 'elegant', 'luxury'],
    moodHistory: [
      { date: '2024-11-01', mood: 'sophisticated', context: 'business dinner tonight' },
      { date: '2024-10-29', mood: 'elegant', context: 'opera night with husband' },
      { date: '2024-10-24', mood: 'confident', context: 'board meeting presentation' },
      { date: '2024-10-19', mood: 'refined', context: 'gallery opening' },
      { date: '2024-10-12', mood: 'luxurious', context: 'spa weekend getaway' }
    ],
    sizingProfile: {
      clothing: 'M',
      shoes: '9'
    },
    lifestyleSegment: 'Luxury Consumer',
    confidenceLevel: 9,
    energyPreference: 'neutral',
    shoppingMotivations: ['status', 'quality', 'timeless style'],
    recentSearches: [
      'luxury leather handbag',
      'gold statement earrings',
      'sophisticated work outfit'
    ],
    wishlistItems: ['Classic Leather Handbag', 'Gold Statement Earrings', 'Little Black Dress'],
    lastActivity: '2024-11-05T11:20:00Z',
    loyaltyTier: 'Platinum'
  }
]

// CRM Service
export class CRMService {
  private static currentUserId: string = 'user_001' // Default user for demo

  static setCurrentUser(userId: string): void {
    this.currentUserId = userId
  }

  static getCurrentUser(): string {
    return this.currentUserId
  }

  static getUserProfile(userId?: string): UserCRMProfile | null {
    const targetUserId = userId || this.currentUserId
    return dummyUsers.find(user => user.id === targetUserId) || null
  }

  static getAllUsers(): UserCRMProfile[] {
    return dummyUsers
  }

  static getPersonalizationData(userId?: string): PersonalizationData {
    const user = this.getUserProfile(userId)
    if (!user) {
      return {
        recommendedStyles: ['versatile'],
        priceRange: { min: 50, max: 300 },
        seasonalPreferences: ['year-round'],
        occasionFrequency: { casual: 5, work: 3, special: 1 },
        colorPreferences: ['neutral'],
        materialPreferences: ['cotton'],
        currentMoodScore: 5,
        confidenceTrend: 'stable'
      }
    }

    return {
      recommendedStyles: user.stylePersonality,
      priceRange: { 
        min: Math.round(user.avgOrderValue * 0.5), 
        max: Math.round(user.avgOrderValue * 2) 
      },
      seasonalPreferences: this.inferSeasonalPreferences(user),
      occasionFrequency: this.calculateOccasionFrequency(user),
      colorPreferences: this.inferColorPreferences(user),
      materialPreferences: this.inferMaterialPreferences(user),
      currentMoodScore: user.confidenceLevel,
      confidenceTrend: this.calculateConfidenceTrend(user)
    }
  }

  static generateInsights(userId?: string): UserInsights {
    const user = this.getUserProfile(userId)
    if (!user) {
      return {
        customerSegment: 'Unknown',
        personalityProfile: 'Unknown User',
        shoppingPattern: 'Occasional shopper',
        emotionalTriggers: ['convenience'],
        nextPurchasePrediction: {
          category: 'general',
          confidence: 0.3,
          timeframe: 'unknown'
        },
        recommendationReasons: ['General preferences']
      }
    }

    return {
      customerSegment: this.determineCustomerSegment(user),
      personalityProfile: this.generatePersonalityProfile(user),
      shoppingPattern: this.analyzeShoppingPattern(user),
      emotionalTriggers: user.shoppingMotivations,
      nextPurchasePrediction: this.predictNextPurchase(user),
      recommendationReasons: this.generateRecommendationReasons(user)
    }
  }

  // Helper methods
  private static inferSeasonalPreferences(user: UserCRMProfile): string[] {
    if (user.location.includes('New York') || user.location.includes('Paris')) {
      return ['fall', 'winter', 'spring']
    }
    if (user.location.includes('Los Angeles')) {
      return ['spring', 'summer']
    }
    return ['year-round']
  }

  private static calculateOccasionFrequency(user: UserCRMProfile): { [occasion: string]: number } {
    if (user.lifestyleSegment === 'Urban Professional') {
      return { work: 8, casual: 5, special: 2, formal: 3 }
    }
    if (user.lifestyleSegment === 'Creative Millennials') {
      return { casual: 9, creative: 7, work: 3, special: 1 }
    }
    if (user.lifestyleSegment === 'Luxury Consumer') {
      return { special: 6, work: 5, formal: 8, casual: 2 }
    }
    return { casual: 5, work: 3, special: 1 }
  }

  private static inferColorPreferences(user: UserCRMProfile): string[] {
    if (user.stylePersonality.includes('minimalist')) {
      return ['black', 'white', 'gray', 'beige']
    }
    if (user.stylePersonality.includes('bohemian')) {
      return ['terracotta', 'sage', 'cream', 'dusty rose']
    }
    if (user.stylePersonality.includes('sophisticated')) {
      return ['black', 'navy', 'burgundy', 'camel']
    }
    return ['neutral']
  }

  private static inferMaterialPreferences(user: UserCRMProfile): string[] {
    if (user.loyaltyTier === 'Platinum') {
      return ['leather', 'silk', 'cashmere', 'wool']
    }
    if (user.stylePersonality.includes('bohemian')) {
      return ['cotton', 'linen', 'organic cotton']
    }
    return ['cotton', 'polyester']
  }

  private static calculateConfidenceTrend(user: UserCRMProfile): 'increasing' | 'stable' | 'declining' {
    const recentMoods = user.moodHistory.slice(0, 3)
    const confidentMoods = recentMoods.filter(m => 
      ['confident', 'elegant', 'sophisticated'].includes(m.mood)
    )
    
    if (confidentMoods.length >= 2) return 'increasing'
    if (confidentMoods.length === 1) return 'stable'
    return 'declining'
  }

  private static generatePersonalityProfile(user: UserCRMProfile): string {
    const personality = user.stylePersonality.join(', ')
    const segment = user.lifestyleSegment
    return `${personality} personality with ${segment} lifestyle`
  }

  private static analyzeShoppingPattern(user: UserCRMProfile): string {
    const frequency = user.orderCount / 12 // orders per month
    if (frequency > 2) return 'Frequent shopper'
    if (frequency > 1) return 'Regular shopper'
    if (frequency > 0.5) return 'Occasional shopper'
    return 'Rare shopper'
  }

  private static predictNextPurchase(user: UserCRMProfile): {
    category: string
    confidence: number
    timeframe: string
  } {
    const topCategory = user.preferredCategories[0]
    const avgDaysBetweenOrders = 365 / user.orderCount
    
    let confidence = 0.7
    if (user.loyaltyTier === 'Platinum') confidence = 0.9
    if (user.loyaltyTier === 'Gold') confidence = 0.8
    if (user.loyaltyTier === 'Silver') confidence = 0.6
    
    let timeframe = `${Math.round(avgDaysBetweenOrders)} days`
    if (avgDaysBetweenOrders < 30) timeframe = 'within 2 weeks'
    if (avgDaysBetweenOrders < 14) timeframe = 'within 1 week'
    
    return {
      category: topCategory,
      confidence,
      timeframe
    }
  }

  private static generateRecommendationReasons(user: UserCRMProfile): string[] {
    const reasons = []
    
    if (user.loyaltyTier === 'Platinum') {
      reasons.push('Premium member preferences')
    }
    
    reasons.push(`${user.stylePersonality[0]} style preference`)
    reasons.push(`${user.lifestyleSegment} lifestyle match`)
    
    if (user.confidenceLevel > 7) {
      reasons.push('High confidence personality')
    }
    
    const recentMood = user.moodHistory[0]?.mood
    if (recentMood) {
      reasons.push(`Recent ${recentMood} mood context`)
    }
    
    return reasons
  }

  // Method to update user mood (for demo purposes)
  static updateUserMood(userId: string, mood: string, context: string): void {
    const user = dummyUsers.find(u => u.id === userId)
    if (user) {
      user.moodHistory.unshift({
        date: new Date().toISOString().split('T')[0],
        mood,
        context
      })
      // Keep only last 10 mood entries
      user.moodHistory = user.moodHistory.slice(0, 10)
      user.lastActivity = new Date().toISOString()
    }
  }

  // Determine customer segment based on spending and behavior
  private static determineCustomerSegment(user: UserCRMProfile): string {
    if (user.totalSpent > 5000) return 'VIP'
    if (user.totalSpent > 2000) return 'Premium'
    if (user.orderCount > 5) return 'Regular'
    return 'New Customer'
  }

  // Track user visit (for analytics)
  static addVisit(userId: string, visitData: any): void {
    // In a real app, this would log to analytics
    console.log(`📊 Visit tracked for ${userId}:`, visitData)
  }
}