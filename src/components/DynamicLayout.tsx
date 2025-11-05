import React from 'react'
import { ProductSuggestion } from '@/types'

interface DynamicLayoutProps {
  suggestions: ProductSuggestion[]
  moodAnalysis: string
  userIntent: string
  layoutStyle?: 'luxe' | 'casual' | 'professional' | 'bohemian' | 'minimalist'
  onProductClick: (suggestion: ProductSuggestion, index: number) => void
}

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  suggestions,
  moodAnalysis,
  userIntent,
  layoutStyle = 'minimalist',
  onProductClick
}) => {
  // Determine layout style based on mood and intent
  const getLayoutStyle = () => {
    const intent = userIntent.toLowerCase()
    const mood = moodAnalysis.toLowerCase()
    
    if (intent.includes('elegant') || intent.includes('luxury') || mood.includes('sophisticated')) {
      return 'luxe'
    } else if (intent.includes('casual') || intent.includes('comfort') || mood.includes('relaxed')) {
      return 'casual'
    } else if (intent.includes('work') || intent.includes('professional') || mood.includes('focused')) {
      return 'professional'
    } else if (intent.includes('artistic') || intent.includes('creative') || mood.includes('expressive')) {
      return 'bohemian'
    }
    return 'minimalist'
  }

  const currentLayout = getLayoutStyle()

  // Layout configurations
  const layoutConfigs = {
    luxe: {
      containerClass: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white',
      cardClass: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gold-500 shadow-xl',
      typography: 'font-serif text-gold-300',
      spacing: 'space-y-8 p-8',
      gridClass: 'grid grid-cols-1 lg:grid-cols-2 gap-8'
    },
    casual: {
      containerClass: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      cardClass: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300',
      typography: 'font-sans text-gray-700',
      spacing: 'space-y-6 p-6',
      gridClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    },
    professional: {
      containerClass: 'bg-gray-50',
      cardClass: 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
      typography: 'font-sans text-gray-900',
      spacing: 'space-y-4 p-4',
      gridClass: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'
    },
    bohemian: {
      containerClass: 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100',
      cardClass: 'bg-white rounded-3xl shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300',
      typography: 'font-serif text-purple-800',
      spacing: 'space-y-8 p-8',
      gridClass: 'grid grid-cols-1 md:grid-cols-2 gap-8'
    },
    minimalist: {
      containerClass: 'bg-white',
      cardClass: 'bg-gray-50 border border-gray-100 hover:bg-white transition-colors',
      typography: 'font-sans text-gray-800',
      spacing: 'space-y-6 p-6',
      gridClass: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  }

  const config = layoutConfigs[currentLayout]

  return (
    <div className={`min-h-screen transition-all duration-1000 ${config.containerClass}`}>
      {/* Dynamic Header based on mood */}
      <div className={`text-center ${config.spacing} ${config.typography}`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {getHeaderText(currentLayout, moodAnalysis)}
        </h1>
        <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto italic">
          "{moodAnalysis}"
        </p>
        <div className="mt-4 text-sm opacity-60">
          Curated for: {userIntent}
        </div>
      </div>

      {/* Dynamic Product Grid */}
      <div className={`${config.spacing}`}>
        <div className={config.gridClass}>
          {suggestions.map((suggestion, index) => (
            <DynamicProductCard
              key={suggestion.id || index}
              suggestion={suggestion}
              index={index}
              layoutStyle={currentLayout}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>

      {/* Mood-based Call to Action */}
      <div className={`text-center ${config.spacing} ${config.typography}`}>
        <button className={getCtaButtonClass(currentLayout)}>
          {getCtaText(currentLayout)}
        </button>
      </div>
    </div>
  )
}

// Dynamic Product Card Component
interface DynamicProductCardProps {
  suggestion: ProductSuggestion
  index: number
  layoutStyle: string
  onProductClick: (suggestion: ProductSuggestion, index: number) => void
}

const DynamicProductCard: React.FC<DynamicProductCardProps> = ({
  suggestion,
  index,
  layoutStyle,
  onProductClick
}) => {
  const cardConfigs = {
    luxe: 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-yellow-600 p-6 rounded-lg',
    casual: 'bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform',
    professional: 'bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow',
    bohemian: 'bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500',
    minimalist: 'bg-white border border-gray-100 p-4 rounded-md hover:shadow-sm transition-shadow'
  }

  return (
    <div
      className={`${cardConfigs[layoutStyle as keyof typeof cardConfigs]} cursor-pointer`}
      onClick={() => onProductClick(suggestion, index)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
        {suggestion.image_url ? (
          <img
            src={suggestion.image_url}
            alt={suggestion.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{suggestion.title}</h3>
        <p className="text-sm opacity-75 line-clamp-2">{suggestion.description}</p>
        
        {suggestion.price && (
          <div className="font-bold text-xl">
            {suggestion.price}
          </div>
        )}

        <div className="flex justify-between items-center text-xs">
          <span className="opacity-60">{suggestion.category}</span>
          {suggestion.brand && <span className="font-medium">{suggestion.brand}</span>}
        </div>
      </div>
    </div>
  )
}

// Helper functions
const getHeaderText = (layout: string, mood: string) => {
  const headers = {
    luxe: 'Exquisite Selection',
    casual: 'Your Perfect Match',
    professional: 'Curated Collection',
    bohemian: 'Artistic Discoveries',
    minimalist: 'Essential Finds'
  }
  return headers[layout as keyof typeof headers] || 'Personalized for You'
}

const getCtaButtonClass = (layout: string) => {
  const classes = {
    luxe: 'bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-4 px-8 rounded-lg transition-colors',
    casual: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors',
    professional: 'bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors',
    bohemian: 'bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors',
    minimalist: 'border-2 border-gray-900 hover:bg-gray-900 hover:text-white font-medium py-3 px-6 rounded transition-colors'
  }
  return classes[layout as keyof typeof classes] || classes.minimalist
}

const getCtaText = (layout: string) => {
  const texts = {
    luxe: 'Explore Premium Collection',
    casual: 'Discover More Styles',
    professional: 'View Business Collection',
    bohemian: 'Find Your Creative Style',
    minimalist: 'See More Essentials'
  }
  return texts[layout as keyof typeof texts] || 'Explore More'
}

export default DynamicLayout