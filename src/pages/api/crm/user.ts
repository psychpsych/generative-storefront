import { NextApiRequest, NextApiResponse } from 'next'
import { CRMService } from '../../../lib/crm'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Get user profile
    const userProfile = CRMService.getUserProfile(userId)
    
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Format data for the UI component
    const formattedData = {
      name: userProfile.name,
      age: userProfile.age,
      location: userProfile.location,
      loyaltyTier: userProfile.loyaltyTier,
      totalSpent: userProfile.totalSpent,
      orderCount: userProfile.orderCount,
      stylePersonality: userProfile.stylePersonality,
      recentMood: userProfile.moodHistory[0]?.mood || 'neutral',
      confidenceLevel: userProfile.confidenceLevel,
      energyPreference: userProfile.energyPreference,
      lifestyleSegment: userProfile.lifestyleSegment,
      preferredBrands: userProfile.preferredBrands,
      wishlistItems: userProfile.wishlistItems,
      recentSearches: userProfile.recentSearches
    }

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('CRM API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}