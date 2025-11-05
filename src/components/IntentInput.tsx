import React, { useState } from 'react'
import { Send, Sparkles, Mic } from 'lucide-react'
import VoiceInput from './VoiceInput'

interface IntentInputProps {
  onSubmit: (intent: string) => void
  isLoading: boolean
  personalizedGreeting?: string
  customerInsights?: any
}

const IntentInput: React.FC<IntentInputProps> = ({ onSubmit, isLoading, personalizedGreeting, customerInsights }) => {
  const [intent, setIntent] = useState('')
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text')

  const handleVoiceResult = (voiceText: string) => {
    setIntent(voiceText)
    if (voiceText.trim()) {
      onSubmit(voiceText.trim())
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (intent.trim() && !isLoading) {
      onSubmit(intent.trim())
    }
  }

  const placeholderTexts = [
    "a cozy outfit for a rainy evening",
    "something elegant for a dinner date",
    "comfortable clothes for working from home",
    "a statement piece for a special occasion",
    "accessories to brighten my mood"
  ]

  const [currentPlaceholder] = useState(
    placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)]
  )

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            Your Personal Shopping Assistant
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          {personalizedGreeting || "Tell me what you're looking for today, and I'll find the perfect match for your mood and style."}
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setInputMode('text')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              inputMode === 'text' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Type
          </button>
          <button
            onClick={() => setInputMode('voice')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              inputMode === 'voice' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mic className="h-4 w-4 inline mr-1" />
            Speak
          </button>
        </div>
      </div>

      {inputMode === 'voice' ? (
        <VoiceInput 
          onVoiceResult={handleVoiceResult}
          isLoading={isLoading}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder={`What are you shopping for today? (e.g., ${currentPlaceholder})`}
              className="input-field min-h-[120px] resize-none pr-16 text-base"
              disabled={isLoading}
              rows={4}
            />
            <button
              type="submit"
              disabled={!intent.trim() || isLoading}
              className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-200 ${
                intent.trim() && !isLoading
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {intent.trim() && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Press Enter or click the send button to get personalized suggestions
            </div>
          )}
        </form>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {placeholderTexts.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setIntent(suggestion)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntentInput