import React, { useState } from 'react'
import { Sparkles, ShoppingBag, Heart, ArrowRight } from 'lucide-react'

interface ShoppingJourneyProps {
  userId: string
  currentSession: any
  onNewSearch: () => void
  onEndSession: () => void
}

const ShoppingJourney: React.FC<ShoppingJourneyProps> = ({
  userId,
  currentSession,
  onNewSearch,
  onEndSession
}) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState({
    satisfaction: 5,
    helpfulness: 5,
    comments: ''
  })

  const handleContinueShopping = () => {
    onNewSearch()
  }

  const handleEndSession = () => {
    setShowFeedback(true)
  }

  const submitFeedback = () => {
    // Feedback'i CRM sistemine kaydet
    console.log('Feedback submitted:', feedback)
    onEndSession()
  }

  const getSessionSummary = () => {
    const searchCount = currentSession?.searches?.length || 0
    const clickCount = currentSession?.clicks?.length || 0
    const timeSpent = currentSession?.totalTime || 0
    
    return {
      searchCount,
      clickCount,
      timeSpent: Math.round(timeSpent / 60), // minutes
      conversion: clickCount > 0
    }
  }

  const summary = getSessionSummary()

  if (showFeedback) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
          <div className="text-center mb-6">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You for Shopping!
            </h2>
            <p className="text-gray-600">
              Your feedback helps us create better experiences
            </p>
          </div>

          <div className="space-y-4">
            {/* Satisfaction Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How satisfied are you with your experience?
              </label>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedback(prev => ({...prev, satisfaction: star}))}
                    className={`p-2 rounded ${
                      star <= feedback.satisfaction 
                        ? 'text-yellow-500' 
                        : 'text-gray-300'
                    }`}
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Helpfulness Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How helpful were our recommendations?
              </label>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedback(prev => ({...prev, helpfulness: star}))}
                    className={`p-2 rounded ${
                      star <= feedback.helpfulness 
                        ? 'text-blue-500' 
                        : 'text-gray-300'
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any additional comments? (Optional)
              </label>
              <textarea
                value={feedback.comments}
                onChange={(e) => setFeedback(prev => ({...prev, comments: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
                placeholder="Tell us what you loved or how we can improve..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowFeedback(false)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={submitFeedback}
              className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-t border-gray-200 p-6 mt-8">
      {/* Session Summary */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Your Shopping Session
        </h3>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{summary.searchCount}</div>
            <div className="text-xs text-gray-500">Searches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{summary.clickCount}</div>
            <div className="text-xs text-gray-500">Items Viewed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{summary.timeSpent}m</div>
            <div className="text-xs text-gray-500">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <button
          onClick={handleContinueShopping}
          className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors"
        >
          <Sparkles className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        
        <button
          onClick={handleEndSession}
          className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition-colors"
        >
          <span>End Session</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Personalized Message */}
      <div className="text-center mt-4 text-sm text-gray-600">
        {summary.conversion 
          ? "We're glad we could help you find something you love! 💖"
          : "Keep exploring - the perfect item is waiting for you! ✨"
        }
      </div>
    </div>
  )
}

export default ShoppingJourney