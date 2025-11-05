import React, { useState, useEffect } from 'react'
import { ProductSuggestion } from '@/types'

interface PersonalizationEngineProps {
  userId: string
  currentSuggestions: ProductSuggestion[]
  userInteractions: any[]
  onPersonalizationUpdate: (newSuggestions: ProductSuggestion[], layoutChanges: any) => void
}

export class PersonalizationEngine {
  static analyzeUserBehavior(interactions: any[]) {
    const recentInteractions = interactions.slice(-10) // Son 10 etkileşim
    
    const patterns = {
      clickedCategories: new Map<string, number>(),
      clickedBrands: new Map<string, number>(),
      clickedPriceRanges: new Map<string, number>(),
      moodPreferences: new Map<string, number>(),
      timeSpentByCategory: new Map<string, number>()
    }

    recentInteractions.forEach(interaction => {
      // Category preferences
      if (interaction.category) {
        patterns.clickedCategories.set(
          interaction.category, 
          (patterns.clickedCategories.get(interaction.category) || 0) + 1
        )
      }

      // Brand preferences
      if (interaction.brand) {
        patterns.clickedBrands.set(
          interaction.brand,
          (patterns.clickedBrands.get(interaction.brand) || 0) + 1
        )
      }

      // Price range analysis
      if (interaction.price) {
        const priceRange = this.getPriceRange(interaction.price)
        patterns.clickedPriceRanges.set(
          priceRange,
          (patterns.clickedPriceRanges.get(priceRange) || 0) + 1
        )
      }

      // Mood preferences
      if (interaction.mood) {
        patterns.moodPreferences.set(
          interaction.mood,
          (patterns.moodPreferences.get(interaction.mood) || 0) + 1
        )
      }
    })

    return patterns
  }

  static getPriceRange(price: number): string {
    if (price < 50) return 'budget'
    if (price < 150) return 'moderate'
    if (price < 300) return 'premium'
    return 'luxury'
  }

  static generatePersonalizedLayout(patterns: any, currentMood: string): any {
    // Layout style seçimi
    let layoutStyle = 'minimalist'
    
    const topMood = Array.from(patterns.moodPreferences.entries())
      .sort((a, b) => b[1] - a[1])[0]
    
    if (topMood) {
      const mood = topMood[0]
      if (['elegant', 'sophisticated', 'luxury'].includes(mood)) {
        layoutStyle = 'luxe'
      } else if (['casual', 'comfortable', 'relaxed'].includes(mood)) {
        layoutStyle = 'casual'
      } else if (['professional', 'business', 'formal'].includes(mood)) {
        layoutStyle = 'professional'
      } else if (['creative', 'artistic', 'expressive'].includes(mood)) {
        layoutStyle = 'bohemian'
      }
    }

    // Color palette seçimi
    let colorPalette = ['#6366f1', '#8b5cf6', '#06b6d4'] // default
    
    if (layoutStyle === 'luxe') {
      colorPalette = ['#1f2937', '#d4af37', '#9ca3af']
    } else if (layoutStyle === 'casual') {
      colorPalette = ['#3b82f6', '#10b981', '#f59e0b']
    } else if (layoutStyle === 'professional') {
      colorPalette = ['#374151', '#6b7280', '#1f2937']
    } else if (layoutStyle === 'bohemian') {
      colorPalette = ['#7c3aed', '#ec4899', '#f97316']
    }

    return {
      layoutStyle,
      colorPalette,
      gridStyle: this.getGridStyle(layoutStyle),
      animations: this.getAnimationStyle(layoutStyle)
    }
  }

  static getGridStyle(layoutStyle: string): string {
    const gridStyles = {
      luxe: 'grid-cols-1 lg:grid-cols-2 gap-8',
      casual: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      professional: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4',
      bohemian: 'grid-cols-1 md:grid-cols-2 gap-8',
      minimalist: 'grid-cols-1 md:grid-cols-3 gap-6'
    }
    return gridStyles[layoutStyle as keyof typeof gridStyles] || gridStyles.minimalist
  }

  static getAnimationStyle(layoutStyle: string): any {
    const animations = {
      luxe: { duration: '800ms', easing: 'ease-in-out', delay: '200ms' },
      casual: { duration: '400ms', easing: 'ease-out', delay: '100ms' },
      professional: { duration: '300ms', easing: 'ease', delay: '50ms' },
      bohemian: { duration: '600ms', easing: 'ease-in-out', delay: '150ms' },
      minimalist: { duration: '500ms', easing: 'ease-out', delay: '100ms' }
    }
    return animations[layoutStyle as keyof typeof animations] || animations.minimalist
  }

  static adaptSuggestionsToUser(
    suggestions: ProductSuggestion[], 
    patterns: any, 
    userId: string
  ): ProductSuggestion[] {
    // Kullanıcı tercihlerine göre sıralama
    return suggestions.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      // Brand preference scoring
      if (patterns.clickedBrands.has(a.brand)) {
        scoreA += patterns.clickedBrands.get(a.brand) * 3
      }
      if (patterns.clickedBrands.has(b.brand)) {
        scoreB += patterns.clickedBrands.get(b.brand) * 3
      }

      // Category preference scoring
      if (patterns.clickedCategories.has(a.category)) {
        scoreA += patterns.clickedCategories.get(a.category) * 2
      }
      if (patterns.clickedCategories.has(b.category)) {
        scoreB += patterns.clickedCategories.get(b.category) * 2
      }

      // Mood preference scoring
      if (patterns.moodPreferences.has(a.mood)) {
        scoreA += patterns.moodPreferences.get(a.mood) * 2
      }
      if (patterns.moodPreferences.has(b.mood)) {
        scoreB += patterns.moodPreferences.get(b.mood) * 2
      }

      return scoreB - scoreA
    })
  }
}

const PersonalizationComponent: React.FC<PersonalizationEngineProps> = ({
  userId,
  currentSuggestions,
  userInteractions,
  onPersonalizationUpdate
}) => {
  useEffect(() => {
    // Kullanıcı davranışlarını analiz et
    const patterns = PersonalizationEngine.analyzeUserBehavior(userInteractions)
    
    // Önerileri kişiselleştir
    const personalizedSuggestions = PersonalizationEngine.adaptSuggestionsToUser(
      currentSuggestions,
      patterns,
      userId
    )

    // Layout'u güncelle
    const layoutChanges = PersonalizationEngine.generatePersonalizedLayout(
      patterns,
      'current_mood' // Bu gerçek mood olmalı
    )

    // Parent component'e bildir
    onPersonalizationUpdate(personalizedSuggestions, layoutChanges)
  }, [userInteractions, currentSuggestions, userId])

  return null // Bu component sadece logic için
}

export default PersonalizationComponent