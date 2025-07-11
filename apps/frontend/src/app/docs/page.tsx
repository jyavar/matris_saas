'use client'

import React, { useEffect, useState } from 'react'
import { useDocs } from '../../contexts/DocsContext'
import { DocsConnectionStatus } from '../../components/docs/ConnectionStatus'
import { DocItem, DocCategory } from '../../services/docs.service'

export default function DocsPage() {
  const { state, loadDocs, loadCategories, loadFeaturedDocs, searchDocs, clearSearch, setSelectedCategory, setSort } = useDocs()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSort, setSelectedSort] = useState<{ sortBy: 'title' | 'created_at' | 'updated_at' | 'views' | 'rating'; sortOrder: 'asc' | 'desc' }>({
    sortBy: 'created_at',
    sortOrder: 'desc'
  })

  // Load initial data
  useEffect(() => {
    loadDocs()
    loadCategories()
    loadFeaturedDocs()
  }, [loadDocs, loadCategories, loadFeaturedDocs])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchDocs(searchQuery.trim(), state.selectedCategory || undefined)
    }
  }

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    clearSearch()
  }

  // Handle sort change
  const handleSortChange = (sortBy: 'title' | 'created_at' | 'updated_at' | 'views' | 'rating', sortOrder: 'asc' | 'desc') => {
    setSelectedSort({ sortBy, sortOrder })
    setSort(sortBy, sortOrder)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Publicado', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
      draft: { label: 'Borrador', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
      archived: { label: 'Archivado', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      guide: '📖',
      api: '🔧',
      tutorial: '🎓',
      reference: '📚',
      faq: '❓',
      changelog: '📝'
    }
    return icons[category] || '📄'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Documentación
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manuales, guías y referencias técnicas de STRATO Core OS™
              </p>
            </div>
            <DocsConnectionStatus showDetails />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Buscar documentación
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar en docs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state.loadingSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {state.loadingSearch ? 'Buscando...' : 'Buscar'}
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categorías
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    state.selectedCategory === null
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Todas las categorías
                </button>
                {state.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                      state.selectedCategory === category.slug
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{getCategoryIcon(category.slug)}</span>
                      {category.name}
                    </span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                      {category.doc_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ordenar por
              </h3>
              <div className="space-y-2">
                {[
                  { value: 'created_at', label: 'Fecha de creación' },
                  { value: 'updated_at', label: 'Última actualización' },
                  { value: 'title', label: 'Título' },
                  { value: 'views', label: 'Vistas' },
                  { value: 'rating', label: 'Calificación' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(
                      option.value as 'title' | 'created_at' | 'updated_at' | 'views' | 'rating',
                      selectedSort.sortBy === option.value && selectedSort.sortOrder === 'desc' ? 'asc' : 'desc'
                    )}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                      selectedSort.sortBy === option.value
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option.label}
                    {selectedSort.sortBy === option.value && (
                      <span className="text-xs">
                        {selectedSort.sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Error Display */}
            {state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800 dark:text-red-400 font-medium">
                    Error: {state.error}
                  </span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {state.searchResults.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Resultados de búsqueda
                  </h2>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
                <div className="space-y-4">
                  {state.searchResults.map((result) => (
                    <div key={result.item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {result.item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {result.item.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{getCategoryIcon(result.item.category)} {result.item.category}</span>
                            <span>📅 {formatDate(result.item.created_at)}</span>
                            <span>👁️ {result.item.views} vistas</span>
                            {result.item.rating && <span>⭐ {result.item.rating}/5</span>}
                          </div>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(result.item.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Docs */}
            {state.featuredDocs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Documentación Destacada
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.featuredDocs.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {doc.title}
                        </h3>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {doc.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{getCategoryIcon(doc.category)} {doc.category}</span>
                        <span>📅 {formatDate(doc.created_at)}</span>
                        <span>👁️ {doc.views} vistas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Documentation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {state.selectedCategory ? `Documentación - ${state.selectedCategory}` : 'Toda la Documentación'}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {state.totalDocs} documentos
                </span>
              </div>

              {state.loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando documentación...</span>
                </div>
              ) : state.docs.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay documentación</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {state.selectedCategory 
                      ? 'No se encontró documentación en esta categoría.'
                      : 'No hay documentación disponible en este momento.'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.docs.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {doc.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{getCategoryIcon(doc.category)} {doc.category}</span>
                            <span>📅 {formatDate(doc.created_at)}</span>
                            <span>👁️ {doc.views} vistas</span>
                            <span>⏱️ {doc.read_time} min</span>
                            {doc.rating && <span>⭐ {doc.rating}/5</span>}
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col items-end gap-2">
                          {getStatusBadge(doc.status)}
                          {doc.featured && (
                            <span className="text-yellow-500 text-xs">⭐ Destacado</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {state.hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => loadDocs(state.currentPage + 1, state.selectedCategory || undefined)}
                    disabled={state.loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {state.loading ? 'Cargando...' : 'Cargar más'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 