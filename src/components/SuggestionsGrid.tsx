import React from 'react'
import { ProductSuggestion } from '@/types'
import ProductCard from './ProductCard'
import { Sparkles, RefreshCw } from 'lucide-react'

interface SuggestionsGridProps {
  suggestions: ProductSuggestion[]
  moodAnalysis?: string
  confidenceScore?: number
  onProductClick: (suggestion: ProductSuggestion, index: number) => void
  onRefresh?: () => void
  isLoading?: boolean
}

const SuggestionsGrid: React.FC<SuggestionsGridProps> = ({
  suggestions,
  moodAnalysis,
  confidenceScore,
  onProductClick,
  onRefresh,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600">Finding perfect matches for you...</p>
        </div>
      </div>
    )
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No suggestions found. Try refining your search.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 animate-fadeIn">
      {/* Header with mood analysis */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">
            Perfect Matches for You
          </h2>
        </div>
        
        {moodAnalysis && (
          <div className="max-w-2xl mx-auto mb-4">
            <p className="text-gray-600 italic">
              "{moodAnalysis}"
            </p>
          </div>
        )}
        
        {confidenceScore && (
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm text-gray-500">
              Confidence: {Math.round(confidenceScore * 100)}%
            </span>
            <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-500"
                style={{ width: `${confidenceScore * 100}%` }}
              />
            </div>
          </div>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Get new suggestions</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {suggestions.map((suggestion, index) => (
          <ProductCard
            key={suggestion.id || index}
            suggestion={suggestion}
            index={index}
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {/* Additional Actions */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          Didn't find what you're looking for?
        </p>
        <button className="btn-secondary">
          Refine your search
        </button>
      </div>
    </div>
  )
}

export default SuggestionsGrid