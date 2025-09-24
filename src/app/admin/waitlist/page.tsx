'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Filter } from 'lucide-react'
import WaitlistTable from '@/components/admin/WaitlistTable'
import WaitlistModal from '@/components/admin/WaitlistModal'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface WaitlistEntry {
  _id: string
  name: string
  pgName: string
  beds: string
  location: string
  phone: string
  role: string
  category: string
  status: 'pending' | 'contacted' | 'converted' | 'rejected'
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

const WaitlistPage = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Filters
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')

  useEffect(() => {
    fetchWaitlistEntries()
  }, [currentPage, statusFilter, locationFilter])

  const fetchWaitlistEntries = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })

      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }
      
      if (locationFilter !== 'all') {
        params.set('location', locationFilter)
      }

      const response = await fetch(`/api/waitlist?${params}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setEntries(data.entries)
        setPagination(data.pagination)
        setError('')
      } else {
        setError('Failed to fetch waitlist entries')
      }
    } catch (error) {
      console.error('Fetch waitlist error:', error)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/waitlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        // Update local state
        setEntries(prev => prev.map(entry => 
          entry._id === id ? { ...entry, status: status as any } : entry
        ))
      } else {
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Update status error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return
    }

    try {
      const response = await fetch(`/api/waitlist/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        // Remove from local state
        setEntries(prev => prev.filter(entry => entry._id !== id))
      } else {
        console.error('Failed to delete entry')
      }
    } catch (error) {
      console.error('Delete entry error:', error)
    }
  }

  const handleView = (entry: WaitlistEntry) => {
    setSelectedEntry(entry)
    setIsModalOpen(true)
  }

  const exportToCSV = () => {
    const csvData = entries.map(entry => ({
      Name: entry.name,
      'PG Name': entry.pgName,
      'Phone': entry.phone,
      'Location': entry.location,
      'Beds': entry.beds,
      'Role': entry.role,
      'Category': entry.category,
      'Status': entry.status,
      'Created Date': new Date(entry.createdAt).toLocaleDateString('en-IN')
    }))

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading && entries.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a0520] mb-2">Waitlist Management</h1>
          <p className="text-gray-600">Manage and track all waitlist entries</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="City Not Mentioned">City Not Mentioned</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">Error loading entries</div>
            <div className="text-gray-500 text-sm">{error}</div>
            <button
              onClick={fetchWaitlistEntries}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <WaitlistTable
            entries={entries}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </motion.div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total} entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!pagination.hasPrev}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPage === page
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
              disabled={!pagination.hasNext}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      <WaitlistModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEntry(null)
        }}
      />
    </div>
  )
}

export default WaitlistPage