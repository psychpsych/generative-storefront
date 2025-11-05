import React, { useState, useRef } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

interface VoiceInputProps {
  onVoiceResult: (text: string) => void
  isLoading: boolean
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceResult, isLoading }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognition = useRef<any>(null)

  // Initialize speech recognition
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = true
      recognition.current.lang = 'en-US'

      recognition.current.onstart = () => {
        setIsListening(true)
      }

      recognition.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
        
        if (finalTranscript) {
          onVoiceResult(finalTranscript)
          setIsListening(false)
        }
      }

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [onVoiceResult])

  const startListening = () => {
    if (recognition.current && !isListening) {
      setTranscript('')
      recognition.current.start()
    }
  }

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const isSupported = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window

  if (!isSupported) {
    return null
  }

  return (
    <div className="voice-input-container">
      {/* Voice Input Button */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isLoading}
          className={`p-4 rounded-full transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>

        <button
          onClick={() => speakText("Hello! What are you shopping for today?")}
          disabled={isLoading}
          className="p-4 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        >
          <Volume2 className="h-6 w-6" />
        </button>
      </div>

      {/* Voice Status */}
      {isListening && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Listening...</span>
          </div>
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600 italic">"{transcript}"</p>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="text-center text-sm text-gray-500">
        <p>💡 Try saying: "I need something cozy for a rainy day" or "Show me elegant dresses for dinner"</p>
      </div>
    </div>
  )
}

export default VoiceInput