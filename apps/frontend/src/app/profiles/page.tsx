'use client'

import React, { useState } from 'react'
import { ProfilesProvider, useProfiles } from '../../contexts/ProfilesContext'
import ConnectionStatus from '../../components/profiles/ConnectionStatus'

function ProfilesDashboard() {
  const { state, getCurrentProfile, updateProfile, uploadAvatar, deleteAvatar, getActivity, searchProfiles, clearError, refreshData } = useProfiles()
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
    location: '',
    website: '',
    company: '',
    job_title: '',
    phone: '',
    timezone: '',
    language: '',
  })

  // Initialize form when profile loads
  React.useEffect(() => {
    if (state.currentProfile) {
      setEditForm({
        full_name: state.currentProfile.full_name || '',
        bio: state.currentProfile.bio || '',
        location: state.currentProfile.location || '',
        website: state.currentProfile.website || '',
        company: state.currentProfile.company || '',
        job_title: state.currentProfile.job_title || '',
        phone: state.currentProfile.phone || '',
        timezone: state.currentProfile.timezone || '',
        language: state.currentProfile.language || '',
      })
    }
  }, [state.currentProfile])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await searchProfiles(searchQuery.trim())
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await updateProfile(editForm)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadAvatar(file)
    }
  }

  const handleDeleteAvatar = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu avatar?')) {
      await deleteAvatar()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Profiles
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Manage user profiles, personal information, and account settings
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshData}
                disabled={state.loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                         text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {state.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <ConnectionStatus showDetails />
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Profile Error</h3>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">{state.error}</p>
                </div>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Profile Information
                  </h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md 
                               text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                               dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>

                {state.currentProfile ? (
                  <div className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        {state.currentProfile.avatar_url ? (
                          <img
                            className="h-20 w-20 rounded-full object-cover"
                            src={state.currentProfile.avatar_url}
                            alt={`Avatar de ${state.currentProfile.full_name}`}
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md 
                                          text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                          dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Upload Avatar
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                            />
                          </label>
                          {state.currentProfile.avatar_url && (
                            <button
                              onClick={handleDeleteAvatar}
                              className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md 
                                       text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                       dark:bg-gray-700 dark:text-red-200 dark:border-red-600 dark:hover:bg-red-900/20"
                            >
                              <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Profile Form */}
                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={editForm.full_name}
                              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </label>
                            <input
                              type="email"
                              value={state.currentProfile.email}
                              disabled
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 
                                       dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Company
                            </label>
                            <input
                              type="text"
                              value={editForm.company}
                              onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={editForm.job_title}
                              onChange={(e) => setEditForm({ ...editForm, job_title: e.target.value })}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Location
                            </label>
                            <input
                              type="text"
                              value={editForm.location}
                              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Website
                            </label>
                            <input
                              type="url"
                              value={editForm.website}
                              onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Bio
                          </label>
                          <textarea
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                     dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={state.loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50
                                     dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            {state.loading ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.full_name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.email}</dd>
                        </div>
                        {state.currentProfile.company && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.company}</dd>
                          </div>
                        )}
                        {state.currentProfile.job_title && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.job_title}</dd>
                          </div>
                        )}
                        {state.currentProfile.location && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.location}</dd>
                          </div>
                        )}
                        {state.currentProfile.website && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                              <a href={state.currentProfile.website} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                {state.currentProfile.website}
                              </a>
                            </dd>
                          </div>
                        )}
                        {state.currentProfile.bio && (
                          <div className="md:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{state.currentProfile.bio}</dd>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No profile loaded</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {state.loading ? 'Loading profile...' : 'Unable to load profile information'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search Profiles */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Search Profiles
                </h3>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, or company..."
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.searchLoading || !searchQuery.trim()}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                             text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                             disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {state.searchLoading ? 'Searching...' : 'Search'}
                  </button>
                </form>

                {/* Search Results */}
                {state.searchResults.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Search Results ({state.searchResults.length})
                    </h4>
                    <div className="space-y-2">
                      {state.searchResults.map((profile) => (
                        <div key={profile.id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
                          <div className="flex-shrink-0">
                            {profile.avatar_url ? (
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={profile.avatar_url}
                                alt={`Avatar de ${profile.full_name}`}
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {profile.full_name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {profile.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Recent Activity
                  </h3>
                  <button
                    onClick={() => getActivity()}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Refresh
                  </button>
                </div>
                {state.activity.length > 0 ? (
                  <div className="space-y-3">
                    {state.activity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilesPage() {
  return (
    <ProfilesProvider>
      <ProfilesDashboard />
    </ProfilesProvider>
  )
} 