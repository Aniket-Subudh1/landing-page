'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, UserCheck, TrendingUp, Calendar, MapPin, Building, Phone, Clock } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface DashboardStats {
  total: number
  byStatus: {
    pending?: number
    contacted?: number
    converted?: number
    rejected?: number
  }
  byLocation: Record<string, number>
  recentEntries: number
}

interface RecentEntry {
  _id: string
  name: string
  pgName: string
  location: string
  status: string
  createdAt: string
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/waitlist?limit=5', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentEntries(data.entries)
      } else {
        setError('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">Error loading dashboard</div>
        <div className="text-gray-500 text-sm">{error}</div>
        <button
          onClick={fetchDashboardData}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'contacted':
        return 'bg-blue-100 text-blue-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-[#1a0520] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your waitlist.</p>
      </motion.div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Entries"
            value={stats.total}
            icon={Users}
            color="purple"
            delay={0.1}
          />
          <StatsCard
            title="Pending"
            value={stats.byStatus.pending || 0}
            icon={Clock}
            color="yellow"
            delay={0.2}
          />
          <StatsCard
            title="Converted"
            value={stats.byStatus.converted || 0}
            icon={UserCheck}
            color="green"
            delay={0.3}
          />
          <StatsCard
            title="This Week"
            value={stats.recentEntries}
            icon={TrendingUp}
            color="blue"
            delay={0.4}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Entries */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a0520] flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Entries
              </h3>
            </div>

            <div className="p-6">
              {recentEntries.length > 0 ? (
                <div className="space-y-4">
                  {recentEntries.map((entry, index) => (
                    <motion.div
                      key={entry._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {entry.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{entry.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span className="flex items-center">
                                <Building className="w-3 h-3 mr-1" />
                                {entry.pgName}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {entry.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(entry.createdAt)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent entries</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Location Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a0520] flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                By Location
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(stats.byLocation).map(([location, count], index) => (
                  <motion.div
                    key={location}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700">{location}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Status Overview */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#1a0520] flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Status Overview
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {stats.byStatus.pending || 0}
                </div>
                <div className="text-sm text-yellow-700">Pending</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stats.byStatus.contacted || 0}
                </div>
                <div className="text-sm text-blue-700">Contacted</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stats.byStatus.converted || 0}
                </div>
                <div className="text-sm text-green-700">Converted</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {stats.byStatus.rejected || 0}
                </div>
                <div className="text-sm text-red-700">Rejected</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AdminDashboard