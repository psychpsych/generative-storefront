import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid'
import { dbOperations } from '@/lib/supabase'
import { ProductDatabase } from '@/lib/productDatabase'
import { CRMService } from '@/lib/crm'
import { ChatGPTResponse, ProductSuggestion } from '@/types'

// Enhanced intent parser for emotional shopping experiences
function parseShoppingIntent(intent: string) {
  const intentLower = intent.toLowerCase();
  
  // Detect emotional context
  const emotions = {
    confident: /\b(confident|powerful|strong|assertive|bold|empowered)\b/i.test(intent),
    cozy: /\b(cozy|comfortable|relaxed|soft|warm|intimate)\b/i.test(intent),
    elegant: /\b(elegant|sophisticated|refined|graceful|chic)\b/i.test(intent),
    romantic: /\b(romantic|date|dinner|special|intimate|love)\b/i.test(intent),
    professional: /\b(work|office|meeting|business|professional|formal)\b/i.test(intent),
    festive: /\b(party|celebration|festival|fun|vibrant|colorful)\b/i.test(intent),
    minimal: /\b(simple|clean|minimal|basic|understated)\b/i.test(intent),
    luxurious: /\b(luxury|premium|expensive|high-end|exclusive)\b/i.test(intent)
  };

  // Detect occasions
  const occasions = {
    work: /\b(work|office|meeting|business|job|career)\b/i.test(intent),
    date: /\b(date|romantic|dinner|evening|special)\b/i.test(intent),
    casual: /\b(casual|everyday|relaxed|weekend|home)\b/i.test(intent),
    travel: /\b(travel|vacation|trip|holiday|journey)\b/i.test(intent),
    special: /\b(special|celebration|party|event|occasion)\b/i.test(intent),
    seasonal: /\b(winter|summer|spring|fall|autumn|rainy|sunny)\b/i.test(intent)
  };

  // Detect style preferences
  const styles = {
    bohemian: /\b(boho|bohemian|free|artistic|creative|flowing)\b/i.test(intent),
    vintage: /\b(vintage|retro|classic|timeless|traditional)\b/i.test(intent),
    modern: /\b(modern|contemporary|sleek|trendy|current)\b/i.test(intent),
    minimalist: /\b(minimal|simple|clean|basic|understated)\b/i.test(intent),
    maximalist: /\b(bold|statement|dramatic|eye-catching|vibrant)\b/i.test(intent)
  };

  // Detect mood indicators
  const moods = {
    happy: /\b(happy|joyful|bright|cheerful|positive)\b/i.test(intent),
    calm: /\b(calm|peaceful|serene|tranquil|zen)\b/i.test(intent),
    energetic: /\b(energetic|active|dynamic|vibrant|lively)\b/i.test(intent),
    contemplative: /\b(thoughtful|quiet|reflective|introspective)\b/i.test(intent),
    adventurous: /\b(adventure|explore|discover|journey|new)\b/i.test(intent)
  };

  // Extract primary emotion/mood
  const primaryEmotion = Object.keys(emotions).find(key => emotions[key as keyof typeof emotions]) || 'neutral';
  const primaryOccasion = Object.keys(occasions).find(key => occasions[key as keyof typeof occasions]) || 'general';
  const primaryStyle = Object.keys(styles).find(key => styles[key as keyof typeof styles]) || 'versatile';
  const primaryMood = Object.keys(moods).find(key => moods[key as keyof typeof moods]) || 'balanced';

  // Detect urgency/timeline
  const urgency = /\b(now|today|urgent|immediately|asap)\b/i.test(intent) ? 'immediate' :
                 /\b(soon|this week|quickly)\b/i.test(intent) ? 'soon' :
                 /\b(later|eventually|someday)\b/i.test(intent) ? 'later' : 'flexible';

  // Detect budget signals
  const budget = /\b(expensive|luxury|premium|high-end|investment)\b/i.test(intent) ? 'luxury' :
                /\b(affordable|budget|cheap|economic|save)\b/i.test(intent) ? 'budget' :
                /\b(mid-range|moderate|reasonable)\b/i.test(intent) ? 'mid' : 'flexible';

  return {
    primaryEmotion,
    primaryOccasion,
    primaryStyle,
    primaryMood,
    urgency,
    budget,
    emotions,
    occasions,
    styles,
    moods,
    rawIntent: intent
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatGPTResponse | { error: string }>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Explicitly handle different HTTP methods
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { intent, userId } = req.body

    if (!intent || typeof intent !== 'string') {
      return res.status(400).json({ error: 'Intent text is required' })
    }

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Parse emotional shopping intent
    const shoppingContext = parseShoppingIntent(intent);
    
    console.log(`🔍 API Request - User ID: ${userId}, Intent: "${intent}"`);
    
    // Get user CRM data for personalization
    const userProfile = CRMService.getUserProfile(userId)
    const personalizationData = CRMService.getPersonalizationData(userId)
    const insights = CRMService.generateInsights(userId)

    console.log(`👤 User Profile: ${userProfile?.name || 'Unknown'}`);
    console.log(`📊 Personalization Data:`, JSON.stringify(personalizationData, null, 2));
    console.log(`🔮 Insights:`, JSON.stringify(insights, null, 2));

    // Get products based on emotional/mood context with CRM personalization
    let relevantProducts = ProductDatabase.personalizedSearch(intent, userId);
    
    console.log(`🛍️ Found ${relevantProducts.length} personalized products for ${userProfile?.name || 'Unknown'}`);
    console.log(`🏷️ Top brands: ${relevantProducts.slice(0, 3).map(p => p.brand).join(', ')}`);
    
    // Apply emotional filtering if we detected strong emotional signals
    if (shoppingContext.primaryEmotion !== 'neutral') {
      relevantProducts = relevantProducts.filter(product => {
        const productMoods = product.mood_tags.join(' ').toLowerCase();
        const productStyles = product.style_tags.join(' ').toLowerCase();
        
        // Match emotional context with product mood tags
        return productMoods.includes(shoppingContext.primaryEmotion) ||
               productStyles.includes(shoppingContext.primaryStyle) ||
               product.occasion_tags.some(tag => tag.includes(shoppingContext.primaryOccasion));
      });
    }
    
    console.log(`Found ${relevantProducts.length} relevant products for emotional intent: "${intent}"`);
    console.log('Shopping context:', shoppingContext);

    // Filter products based on user preferences and budget signals
    const filteredProducts = relevantProducts.filter(product => {
      const price = product.sale_price || product.price;
      
      // Apply budget filtering based on detected signals
      if (shoppingContext.budget === 'luxury' && price < 200) return false;
      if (shoppingContext.budget === 'budget' && price > 100) return false;
      if (shoppingContext.budget === 'mid' && (price < 50 || price > 300)) return false;
      
      // Apply general personalization
      return price >= personalizationData.priceRange.min && 
             price <= personalizationData.priceRange.max;
    });

    // If no products in price range, show best matches anyway
    const productsToShow = filteredProducts.length > 0 ? filteredProducts : relevantProducts.slice(0, 5)

    // Store the intent in database (skip if demo mode)
    let storedIntent: any = { id: uuidv4() }
    try {
      storedIntent = await dbOperations.createIntent(userId, intent)
      if (!storedIntent) {
        console.warn('Database not configured, running in demo mode')
        storedIntent = { id: uuidv4() }
      }
    } catch (error) {
      console.warn('Database error, running in demo mode:', error)
      storedIntent = { id: uuidv4() }
    }

    // Create context-aware prompt for emotional commerce
    const systemPrompt = `You are AKQA's Generative Store AI - an emotional commerce engine that transforms shopping into intimate, personalized experiences.

Your mission: Replace static catalogs with living, breathing shopping moments that listen, curate, and design based on emotional intent.

EMOTIONAL CONTEXT ANALYSIS:
- Primary Emotion: ${shoppingContext.primaryEmotion}
- Occasion: ${shoppingContext.primaryOccasion}  
- Style: ${shoppingContext.primaryStyle}
- Mood: ${shoppingContext.primaryMood}
- Urgency: ${shoppingContext.urgency}
- Budget Signals: ${shoppingContext.budget}

USER INTENT: "${intent}"

CUSTOMER PROFILE:
- Name: ${userProfile?.name || 'Unknown Customer'}
- Age: ${userProfile?.age || 'Unknown'}
- Gender: ${userProfile?.gender || 'Unknown'}
- Location: ${userProfile?.location || 'Unknown'}
- Segment: ${insights.customerSegment}
- Style DNA: ${personalizationData?.recommendedStyles?.join(', ') || 'Unknown style preferences'}
- Budget Range: €${personalizationData?.priceRange?.min || 0}-${personalizationData?.priceRange?.max || 1000}

CURATED INVENTORY (${productsToShow.length} emotion-matched items):
${productsToShow.map(p => `
- ID: ${p.id}
- ${p.name} by ${p.brand}
- €${p.price} ${p.sale_price ? `(was €${p.price})` : ''}
- Emotional Tags: ${Array.isArray(p.mood_tags) ? p.mood_tags.join(', ') : p.mood_tags || 'N/A'}
- Style DNA: ${Array.isArray(p.style_tags) ? p.style_tags.join(', ') : p.style_tags || 'N/A'}
- Perfect For: ${Array.isArray(p.occasion_tags) ? p.occasion_tags.join(', ') : p.occasion_tags || 'N/A'}
- Materials: ${Array.isArray(p.materials) ? p.materials.join(', ') : p.materials || 'N/A'}
- Image: ${Array.isArray(p.images) ? p.images[0] : p.images || 'N/A'}
`).join('\n')}

TASK: Create a generative shopping experience that feels crafted in the moment of need.

Build a bespoke digital boutique that:
1. Reflects the emotional undertone of their intent
2. Tells a compelling story about why these pieces matter now
3. Creates cross-selling opportunities through narrative
4. Delivers the intimacy of luxury retail at digital scale

Return ONLY valid JSON that will generate their personalized storefront:
{
  "personalized_intro": {
    "greeting": "Personal greeting using their name and acknowledging their request",
    "context_recognition": "Acknowledgment of their current mood/situation/intent (2-3 sentences)",
    "expertise_connection": "How your AI understands their specific style DNA and preferences (2-3 sentences)",
    "curation_promise": "What makes this selection special for them right now (1-2 sentences)"
  },
  "suggestions": [
    {
      "id": "product_id",
      "title": "product name",
      "description": "Emotional story (60-80 words) - why this piece speaks to their current state/need",
      "category": "category",
      "price": "€price",
      "brand": "brand",
      "image_url": "image_url",
      "materials": ["material"],
      "energy_level": "calm|energizing|neutral",
      "personality_fit": ["personality trait"],
      "lifestyle_tags": ["lifestyle"],
      "confidence_boost": 7,
      "emotional_resonance": "why this connects to their ${shoppingContext.primaryEmotion} mood",
      "styling_narrative": "how this fits their ${shoppingContext.primaryStyle} aesthetic"
    }
  ],
  "experience_narrative": "Personal story (100+ words) about this curated moment - why these pieces were chosen for them right now",
  "mood_analysis": "Deep analysis of their emotional shopping state and what they're truly seeking",
  "layout_style": "luxe|bohemian|minimal|editorial|intimate (based on emotional context)",
  "color_palette": ["#primary", "#secondary", "#accent"] (colors that match their emotional state),
  "confidence_score": 0.95
}

Channel the intimacy of a luxury boutique advisor who remembers their preferences, understands their life context, and curates with emotional intelligence.`;

    const userPrompt = `Transform this shopping moment into an intimate, personalized experience: "${intent}"

Their emotional state suggests they need ${shoppingContext.primaryEmotion} pieces for ${shoppingContext.primaryOccasion} occasions. Make it feel like you know them personally.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    })

    const response = completion.choices[0].message?.content
    if (!response) {
      return res.status(500).json({ error: 'No response from AI' })
    }

    // Parse the JSON response
    let parsedResponse: ChatGPTResponse
    try {
      parsedResponse = JSON.parse(response)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      // Fallback response
      parsedResponse = {
        personalized_intro: {
          greeting: `Merhaba ${userProfile?.name || 'Değerli Müşterimiz'}! Size özel seçenekler hazırlıyoruz.`,
          context_recognition: `"${intent}" isteğinizi anlıyor ve size en uygun ürünleri bulmaya çalışıyoruz.`,
          expertise_connection: `${userProfile?.gender === 'female' ? 'Kadın' : userProfile?.gender === 'male' ? 'Erkek' : 'Sizin'} stilinize ve tercihlerinize uygun seçenekleri özellikle seçtik.`,
          curation_promise: `Bu seçim, sizin için özenle hazırlanmış özel bir koleksiyon.`
        },
        suggestions: [
          {
            id: uuidv4(),
            title: "Curated Selection",
            description: "Based on your request, we've found some great options that might interest you.",
            category: "General",
            price: "Varies",
            brand: "Various",
            image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
            materials: ["Various"],
            energy_level: "neutral",
            personality_fit: ["versatile"],
            lifestyle_tags: ["adaptable"],
            confidence_boost: 5
          }
        ],
        mood_analysis: "We're processing your request and will provide personalized suggestions.",
        confidence_score: 0.5
      }
    }

    // Add IDs to suggestions
    parsedResponse.suggestions = parsedResponse.suggestions.map(suggestion => ({
      ...suggestion,
      id: uuidv4()
    }))

    // Store suggestions in database
    try {
      await dbOperations.createSuggestion(storedIntent.id, parsedResponse.suggestions)
      await dbOperations.updateIntent(storedIntent.id, { processed: true })
    } catch (error) {
      console.warn('Database storage failed, continuing in demo mode')
    }

    // Track this visit in CRM
    CRMService.addVisit(userId, {
      date: new Date().toISOString(),
      intent,
      products_viewed: parsedResponse.suggestions.map(s => s.id || ''),
      time_spent: 0, // Will be updated by frontend
      conversion: false
    })

    res.status(200).json(parsedResponse)

  } catch (error) {
    console.error('Error in intent API:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Vercel function configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Remove unsupported runtime specification
  maxDuration: 30, // 30 seconds max duration
}