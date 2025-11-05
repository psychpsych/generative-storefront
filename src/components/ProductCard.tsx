import React from 'react'
import { ProductSuggestion } from '@/types'
import { Heart, ShoppingBag, Star } from 'lucide-react'

interface ProductCardProps {
  suggestion: ProductSuggestion
  index: number
  onProductClick: (suggestion: ProductSuggestion, index: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ suggestion, index, onProductClick }) => {
  const handleClick = () => {
    onProductClick(suggestion, index)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover cursor-pointer animate-slideUp"
         style={{ animationDelay: `${index * 0.1}s` }}
         onClick={handleClick}>
      
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={suggestion.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop'}
          alt={suggestion.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        
        {/* Mood Badge */}
        {suggestion.mood && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
              {suggestion.mood}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {suggestion.title}
          </h3>
          {suggestion.price && (
            <span className="text-lg font-bold text-primary-600 ml-2">
              {suggestion.price}
            </span>
          )}
        </div>

        {suggestion.brand && (
          <p className="text-sm text-gray-500 mb-2">{suggestion.brand}</p>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {suggestion.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestion.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {suggestion.category}
            </span>
          )}
          {suggestion.occasion && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
              {suggestion.occasion}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-gray-300" />
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div>
          
          <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium">View</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard