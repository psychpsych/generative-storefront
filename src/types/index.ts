// Type definitions for the Generative Storefront application

export interface User {
  id: string;
  created_at: string;
  last_visit?: string;
}

export interface UserProfile {
  id: string;
  preferences: string[];
  style_tags: string[];
  past_purchases: string[];
  mood_history: string[];
  current_mood?: string;
  personality_type?: string;
  shopping_patterns: {
    price_range: string;
    preferred_categories: string[];
    seasonal_preferences: string[];
  };
}

export interface Intent {
  id: string;
  user_id: string;
  text: string;
  timestamp: string;
  processed: boolean;
}

export interface ProductSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: string;
  image_url?: string;
  brand?: string;
  mood?: string;
  occasion?: string;
  // Emotional commerce fields
  materials: string[];
  energy_level?: 'calm' | 'energizing' | 'neutral';
  personality_fit?: string[];
  lifestyle_tags?: string[];
  confidence_boost?: number;
  emotional_resonance?: string;
  styling_narrative?: string;
}

export interface Suggestion {
  id: string;
  intent_id: string;
  json_data: ProductSuggestion[];
  created_at: string;
}

export interface Click {
  id: string;
  suggestion_id: string;
  product_index: number;
  timestamp: string;
  user_id: string;
}

export interface ChatGPTResponse {
  suggestions: ProductSuggestion[];
  mood_analysis?: string;
  confidence_score?: number;
  layout_style?: string;
  experience_theme?: string;
  narrative?: string;
  color_palette?: string[];
}

export interface AnalyticsData {
  total_intents: number;
  total_clicks: number;
  ctr: number;
  repeat_visits: number;
  avg_response_time: number;
}

// OpenAI API types
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}