// CRM ve User Data Management
export interface UserProfile {
  id: string
  email?: string
  name?: string
  age?: number
  gender?: string
  location?: string
  preferences: UserPreferences
  behavior: UserBehavior
  history: PurchaseHistory[]
  visits: VisitHistory[]
  created_at: string
  last_updated: string
}

export interface UserPreferences {
  favorite_brands: string[]
  preferred_categories: string[]
  style_preferences: string[]
  color_preferences: string[]
  size_info: {
    clothing_size: string
    shoe_size: string
  }
  price_range: {
    min: number
    max: number
    preferred_max: number
  }
  lifestyle: string[] // ["sustainable", "luxury", "budget-conscious", "trendy"]
  shopping_frequency: string // "weekly" | "monthly" | "seasonal" | "occasional"
}

export interface UserBehavior {
  browsing_patterns: {
    most_viewed_categories: string[]
    average_session_duration: number
    pages_per_session: number
    device_preference: string // "mobile" | "desktop" | "tablet"
  }
  engagement: {
    click_through_rate: number
    cart_abandonment_rate: number
    return_visitor: boolean
    email_engagement: number
  }
  seasonal_patterns: {
    peak_shopping_seasons: string[]
    preferred_shopping_times: string[]
  }
}

export interface PurchaseHistory {
  order_id: string
  date: string
  total_amount: number
  items: PurchaseItem[]
  satisfaction_rating?: number
}

export interface PurchaseItem {
  product_id: string
  product_name: string
  category: string
  price: number
  quantity: number
}

export interface VisitHistory {
  date: string
  intent?: string
  products_viewed: string[]
  time_spent: number
  conversion: boolean
}

// Mock CRM Data
export const mockUserProfiles: { [userId: string]: UserProfile } = {
  "user_001": {
    id: "user_001",
    email: "emma.style@example.com",
    name: "Emma",
    age: 28,
    gender: "female",
    location: "San Francisco, CA",
    preferences: {
      favorite_brands: ["Everlane", "Reformation", "Ganni"],
      preferred_categories: ["clothing", "accessories"],
      style_preferences: ["minimalist", "sophisticated", "sustainable"],
      color_preferences: ["neutral", "earth tones", "navy"],
      size_info: {
        clothing_size: "M",
        shoe_size: "8"
      },
      price_range: {
        min: 50,
        max: 400,
        preferred_max: 250
      },
      lifestyle: ["sustainable", "professional", "quality-focused"],
      shopping_frequency: "monthly"
    },
    behavior: {
      browsing_patterns: {
        most_viewed_categories: ["clothing", "accessories", "shoes"],
        average_session_duration: 12.5,
        pages_per_session: 8.3,
        device_preference: "mobile"
      },
      engagement: {
        click_through_rate: 0.24,
        cart_abandonment_rate: 0.35,
        return_visitor: true,
        email_engagement: 0.42
      },
      seasonal_patterns: {
        peak_shopping_seasons: ["fall", "spring"],
        preferred_shopping_times: ["weekend mornings", "evening"]
      }
    },
    history: [
      {
        order_id: "order_001",
        date: "2024-10-15T10:30:00Z",
        total_amount: 275,
        items: [
          {
            product_id: "prod_001",
            product_name: "Cashmere Oversized Sweater",
            category: "clothing",
            price: 180,
            quantity: 1
          },
          {
            product_id: "prod_004",
            product_name: "Leather Crossbody Bag",
            category: "accessories",
            price: 95,
            quantity: 1
          }
        ],
        satisfaction_rating: 5
      }
    ],
    visits: [
      {
        date: "2024-11-05T14:20:00Z",
        intent: "comfortable work from home outfit",
        products_viewed: ["prod_001", "prod_003"],
        time_spent: 8.5,
        conversion: false
      }
    ],
    created_at: "2024-08-20T09:00:00Z",
    last_updated: "2024-11-05T14:20:00Z"
  },
  "default_user": {
    id: "default_user",
    preferences: {
      favorite_brands: [],
      preferred_categories: ["clothing"],
      style_preferences: ["casual"],
      color_preferences: ["neutral"],
      size_info: {
        clothing_size: "M",
        shoe_size: "9"
      },
      price_range: {
        min: 0,
        max: 500,
        preferred_max: 150
      },
      lifestyle: ["versatile"],
      shopping_frequency: "occasional"
    },
    behavior: {
      browsing_patterns: {
        most_viewed_categories: ["clothing"],
        average_session_duration: 5,
        pages_per_session: 4,
        device_preference: "mobile"
      },
      engagement: {
        click_through_rate: 0.15,
        cart_abandonment_rate: 0.5,
        return_visitor: false,
        email_engagement: 0.2
      },
      seasonal_patterns: {
        peak_shopping_seasons: ["fall"],
        preferred_shopping_times: ["evening"]
      }
    },
    history: [],
    visits: [],
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString()
  }
}

// CRM Functions
export class CRMService {
  static getUserProfile(userId: string): UserProfile {
    return mockUserProfiles[userId] || mockUserProfiles["default_user"]
  }

  static updateUserProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const currentProfile = this.getUserProfile(userId)
    const updatedProfile = { ...currentProfile, ...updates, last_updated: new Date().toISOString() }
    mockUserProfiles[userId] = updatedProfile
    return updatedProfile
  }

  static addVisit(userId: string, visit: VisitHistory): void {
    const profile = this.getUserProfile(userId)
    profile.visits.push(visit)
    profile.last_updated = new Date().toISOString()
    mockUserProfiles[userId] = profile
  }

  static addPurchase(userId: string, purchase: PurchaseHistory): void {
    const profile = this.getUserProfile(userId)
    profile.history.push(purchase)
    profile.last_updated = new Date().toISOString()
    mockUserProfiles[userId] = profile
  }

  static getPersonalizationData(userId: string): {
    recommendedCategories: string[]
    priceRange: { min: number; max: number }
    styleKeywords: string[]
    brandPreferences: string[]
    recentInterests: string[]
  } {
    const profile = this.getUserProfile(userId)
    
    return {
      recommendedCategories: profile.preferences.preferred_categories,
      priceRange: {
        min: profile.preferences.price_range.min,
        max: profile.preferences.price_range.preferred_max
      },
      styleKeywords: [
        ...profile.preferences.style_preferences,
        ...profile.preferences.lifestyle
      ],
      brandPreferences: profile.preferences.favorite_brands,
      recentInterests: profile.behavior.browsing_patterns.most_viewed_categories
    }
  }

  static generateInsights(userId: string): {
    customerSegment: string
    buyingPower: string
    loyaltyLevel: string
    recommendedApproach: string
    personalizedGreeting: string
  } {
    const profile = this.getUserProfile(userId)
    
    // Customer Segmentation
    let customerSegment = "new_visitor"
    if (profile.history.length > 3) {
      customerSegment = "loyal_customer"
    } else if (profile.history.length > 0) {
      customerSegment = "returning_customer"
    }

    // Buying Power Analysis
    let buyingPower = "moderate"
    if (profile.preferences.price_range.preferred_max > 300) {
      buyingPower = "high"
    } else if (profile.preferences.price_range.preferred_max < 100) {
      buyingPower = "budget_conscious"
    }

    // Loyalty Level
    let loyaltyLevel = "new"
    if (profile.behavior.engagement.return_visitor && profile.history.length > 2) {
      loyaltyLevel = "high"
    } else if (profile.behavior.engagement.return_visitor) {
      loyaltyLevel = "medium"
    }

    // Recommended Approach
    let recommendedApproach = "discovery_focused"
    if (customerSegment === "loyal_customer") {
      recommendedApproach = "relationship_focused"
    } else if (buyingPower === "high") {
      recommendedApproach = "premium_focused"
    } else if (buyingPower === "budget_conscious") {
      recommendedApproach = "value_focused"
    }

    // Personalized Greeting
    let personalizedGreeting = "Welcome! What are you looking for today?"
    if (profile.name) {
      if (customerSegment === "loyal_customer") {
        personalizedGreeting = `Welcome back, ${profile.name}! Ready to discover something special?`
      } else if (customerSegment === "returning_customer") {
        personalizedGreeting = `Hi ${profile.name}! What's on your style wishlist today?`
      } else {
        personalizedGreeting = `Hello ${profile.name}! Let's find something perfect for you.`
      }
    } else if (customerSegment === "returning_customer") {
      personalizedGreeting = "Welcome back! What can we help you find today?"
    }

    return {
      customerSegment,
      buyingPower,
      loyaltyLevel,
      recommendedApproach,
      personalizedGreeting
    }
  }
}