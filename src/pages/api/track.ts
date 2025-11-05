import { NextApiRequest, NextApiResponse } from 'next'
import { dbOperations } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { suggestionId, productIndex, userId } = req.body

    if (!suggestionId || !userId || productIndex === undefined) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Track the click
    const click = await dbOperations.trackClick(suggestionId, productIndex, userId)
    
    if (!click) {
      return res.status(500).json({ error: 'Failed to track click' })
    }

    res.status(200).json({ success: true, click })

  } catch (error) {
    console.error('Error in track API:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}