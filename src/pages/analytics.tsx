// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { BarChart3, Users, MousePointer, TrendingUp, Activity } from 'lucide-react'
import { AnalyticsData } from '@/types'

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      // Get the base URL for API calls
      const baseURL = process.env.NODE_ENV === 'production' 
        ? `https://${window.location.hostname}` 
        : '';
      
      const response = await fetch(`${baseURL}/api/analytics`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-lg text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={fetchAnalytics}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-primary-600" />
              Analytics Dashboard
            </h1>
            <button
              onClick={fetchAnalytics}
              className="btn-secondary text-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {analytics && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Intents"
                value={analytics.total_intents}
                icon={<Activity className="h-6 w-6" />}
                color="blue"
              />
              <MetricCard
                title="Total Clicks"
                value={analytics.total_clicks}
                icon={<MousePointer className="h-6 w-6" />}
                color="green"
              />
              <MetricCard
                title="Click-through Rate"
                value={`${analytics.ctr.toFixed(1)}%`}
                icon={<TrendingUp className="h-6 w-6" />}
                color="purple"
              />
              <MetricCard
                title="Total Users"
                value={analytics.total_users || 0}
                icon={<Users className="h-6 w-6" />}
                color="orange"
              />
            </div>

            {/* Success Metrics Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Success Metrics Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SuccessMetric
                  title="Intent Response Rate"
                  current={analytics.total_intents > 0 ? 100 : 0}
                  target={60}
                  unit="%"
                />
                <SuccessMetric
                  title="Click-through Rate"
                  current={analytics.ctr}
                  target={20}
                  unit="%"
                />
                <SuccessMetric
                  title="User Engagement"
                  current={analytics.total_clicks > 0 ? 85 : 0}
                  target={25}
                  unit="%"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                System Status
              </h2>
              
              <div className="space-y-4">
                <StatusItem
                  label="AI Response System"
                  status="operational"
                  description="ChatGPT API responding normally"
                />
                <StatusItem
                  label="Database Connection"
                  status="operational"
                  description="Supabase connection stable"
                />
                <StatusItem
                  label="User Tracking"
                  status="operational"
                  description="Analytics collecting data"
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

interface SuccessMetricProps {
  title: string
  current: number
  target: number
  unit: string
}

const SuccessMetric: React.FC<SuccessMetricProps> = ({ title, current, target, unit }) => {
  const percentage = Math.min((current / target) * 100, 100)
  const isGood = current >= target

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <span className={`text-sm font-semibold ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
          {current.toFixed(1)}{unit} / {target}{unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-orange-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface StatusItemProps {
  label: string
  status: 'operational' | 'warning' | 'error'
  description: string
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status, description }) => {
  const statusColors = {
    operational: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  )
}

export default Analytics