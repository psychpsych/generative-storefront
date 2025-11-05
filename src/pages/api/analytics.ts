import { NextApiRequest, NextApiResponse } from 'next'
import { dbOperations } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const analytics = await dbOperations.getAnalytics()
    res.status(200).json(analytics)

  } catch (error) {
    console.error('Error in analytics API:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}