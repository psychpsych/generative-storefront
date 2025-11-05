import { useState } from 'react';
import type { ProductSuggestion } from '@/types';
import CRMDisplay from '@/components/CRMDisplay';

interface SessionData {
  sessionId: string;
  startTime: Date;
  interactions: number;
  currentStep: string;
}

export default function Home() {
  const [userIntent, setUserIntent] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>('user_001'); // Track active user
  const [sessionData] = useState<SessionData>({
    sessionId: `session_${Date.now()}`,
    startTime: new Date(),
    interactions: 0,
    currentStep: 'input'
  });
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);

  // Loading messages array
  const loadingTexts = [
    "🔍 Size en uygun seçenekleri arıyorum...",
    "✨ Kişisel tercihleri analiz ediyorum...",
    "🎨 Stilinize uygun öneriler hazırlıyorum...",
    "💫 Mükemmel eşleşmeleri buluyorum...",
    "🌟 Kişisel önerileriniz hazır!"
  ];

  const handleSubmit = async (intent: string) => {
    setUserIntent(intent);
    setIsLoading(true);
    setLoadingMessages([]);
    
    // Animated loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessages(prev => {
        const nextIndex = prev.length;
        if (nextIndex < loadingTexts.length - 1) {
          return [...prev, loadingTexts[nextIndex]];
        } else {
          clearInterval(messageInterval);
          return prev;
        }
      });
    }, 800);

    try {
      console.log(`🚀 API Call: Sending request for user ${currentUserId} with intent: "${intent}"`);
      
      // Get the base URL for API calls
      const baseURL = process.env.NODE_ENV === 'production' 
        ? `https://${window.location.hostname}` 
        : '';
      
      const response = await fetch(`${baseURL}/api/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          intent,
          userId: currentUserId // Use the selected CRM user instead of session ID
        }),
      });

      if (!response.ok) {
        throw new Error('Öneri alınamadı');
      }

      const data = await response.json();
      
      // Simulate final loading step
      setTimeout(() => {
        setLoadingMessages(prev => [...prev, loadingTexts[loadingTexts.length - 1]]);
        
        setTimeout(() => {
          setSuggestions(data.suggestions || []);
          setIsLoading(false);
          setLoadingMessages([]);
        }, 600);
      }, 400);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setLoadingMessages([]);
    }
  };

  // Handle CRM user switching
  const handleUserSwitch = (newUserId: string) => {
    setCurrentUserId(newUserId);
    // Clear suggestions when switching users to force new search
    setSuggestions([]);
    // Show a brief notification that user has switched
    console.log(`🔄 Main App: Switched to user: ${newUserId}`);
  };

  const handleNewSearch = () => {
    setUserIntent('');
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Generative Store
              </span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Input Section */}
          {(!userIntent || suggestions.length === 0) && !isLoading && (
            <div className="mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8">
                
                {/* Simple Input Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const intent = formData.get('intent') as string;
                  if (intent.trim()) {
                    handleSubmit(intent.trim());
                  }
                }} className="space-y-4">
                  <div className="relative">
                    <textarea
                      name="intent"
                      placeholder="I'm feeling confident and need something that makes me feel powerful for my big presentation tomorrow..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-gray-900 placeholder-gray-500"
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Emotional Quick Starts */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <button 
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="intent"]') as HTMLTextAreaElement;
                        textarea.value = "I'm feeling confident and need something powerful for my big presentation tomorrow";
                      }}
                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      💪 Confident
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="intent"]') as HTMLTextAreaElement;
                        textarea.value = "I want to feel cozy and comfortable for a quiet rainy weekend at home";
                      }}
                      className="px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                    >
                      🏠 Cozy
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="intent"]') as HTMLTextAreaElement;
                        textarea.value = "I need something elegant and sophisticated for a romantic dinner date";
                      }}
                      className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      💎 Elegant
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="intent"]') as HTMLTextAreaElement;
                        textarea.value = "I'm feeling creative and free-spirited, looking for something artistic and expressive";
                      }}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      � Creative
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg">✨</span>
                      AI ile Keşfet
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Loading Section */}
          {isLoading && (
            <div className="mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg">✨</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 min-h-[120px]">
                    {loadingMessages.map((message, index) => (
                      <div 
                        key={index}
                        className={`text-sm sm:text-base text-gray-700 transition-all duration-500 ${
                          index === loadingMessages.length - 1 ? 'opacity-100 font-medium' : 'opacity-60'
                        }`}
                        style={{
                          animationDelay: `${index * 0.8}s`
                        }}
                      >
                        {message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          {suggestions.length > 0 && !isLoading && (
            <div className="space-y-6">
              {/* User Intent Display */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">💭</span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Aramanız
                  </span>
                </div>
                <p className="text-gray-900 font-medium text-base sm:text-lg">
                  "{userIntent}"
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {suggestions.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                    onClick={() => console.log('Product clicked:', product.id)}
                  >
                    {product.image_url && (
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img 
                          src={product.image_url} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                          {product.title}
                        </h3>
                        {product.price && (
                          <span className="text-purple-600 font-bold text-sm sm:text-base ml-2 flex-shrink-0">
                            {product.price}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Materials & Availability */}
                      {(product.materials || product.energy_level) && (
                        <div className="space-y-2 mb-3">
                          {product.materials && product.materials.length > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-gray-500">🧵</span>
                              <span className="text-gray-600">{product.materials.join(', ')}</span>
                            </div>
                          )}
                          {product.energy_level && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-gray-500">⚡</span>
                              <span className="text-gray-600 capitalize">{product.energy_level}</span>
                            </div>
                          )}
                          {product.confidence_boost && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-gray-500">💪</span>
                              <span className="text-gray-600">Confidence +{product.confidence_boost}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {product.brand && (
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            {product.brand}
                          </span>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          {product.personality_fit && product.personality_fit.length > 0 && (
                            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                              {product.personality_fit[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Search Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleNewSearch}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="text-lg">🔍</span>
                  Yeni Arama
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      {/* CRM Display Component */}
      <CRMDisplay 
        userId={currentUserId} 
        onUserSwitch={handleUserSwitch}
      />
    </div>
  );
}