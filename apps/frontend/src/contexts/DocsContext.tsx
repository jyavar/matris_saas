'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { DocsService, DocItem, DocCategory, DocSearchResult, ServiceHealth } from '../services/docs.service'

// Types
interface DocsState {
  // Data
  docs: DocItem[]
  categories: DocCategory[]
  featuredDocs: DocItem[]
  searchResults: DocSearchResult[]
  currentDoc: DocItem | null
  relatedDocs: DocItem[]
  
  // Loading states
  loading: boolean
  loadingDoc: boolean
  loadingCategories: boolean
  loadingSearch: boolean
  loadingFeatured: boolean
  loadingRelated: boolean
  
  // Error states
  error: string | null
  searchError: string | null
  
  // Pagination
  totalDocs: number
  currentPage: number
  docsPerPage: number
  hasMore: boolean
  
  // Search
  searchQuery: string
  searchCategory: string | null
  
  // Health
  health: ServiceHealth | null
  circuitBreakerOpen: boolean
  
  // UI state
  selectedCategory: string | null
  sortBy: 'title' | 'created_at' | 'updated_at' | 'views' | 'rating'
  sortOrder: 'asc' | 'desc'
}

type DocsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOADING_DOC'; payload: boolean }
  | { type: 'SET_LOADING_CATEGORIES'; payload: boolean }
  | { type: 'SET_LOADING_SEARCH'; payload: boolean }
  | { type: 'SET_LOADING_FEATURED'; payload: boolean }
  | { type: 'SET_LOADING_RELATED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_ERROR'; payload: string | null }
  | { type: 'SET_DOCS'; payload: { docs: DocItem[]; total: number } }
  | { type: 'SET_CATEGORIES'; payload: DocCategory[] }
  | { type: 'SET_FEATURED_DOCS'; payload: DocItem[] }
  | { type: 'SET_SEARCH_RESULTS'; payload: DocSearchResult[] }
  | { type: 'SET_CURRENT_DOC'; payload: DocItem | null }
  | { type: 'SET_RELATED_DOCS'; payload: DocItem[] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_CATEGORY'; payload: string | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'SET_SORT'; payload: { sortBy: DocsState['sortBy']; sortOrder: 'asc' | 'desc' } }
  | { type: 'SET_HEALTH'; payload: ServiceHealth }
  | { type: 'SET_CIRCUIT_BREAKER'; payload: boolean }
  | { type: 'ADD_DOC'; payload: DocItem }
  | { type: 'UPDATE_DOC'; payload: DocItem }
  | { type: 'DELETE_DOC'; payload: string }
  | { type: 'INCREMENT_VIEWS'; payload: { docId: string; views: number } }
  | { type: 'UPDATE_RATING'; payload: { docId: string; rating: number } }

// Initial state
const initialState: DocsState = {
  docs: [],
  categories: [],
  featuredDocs: [],
  searchResults: [],
  currentDoc: null,
  relatedDocs: [],
  loading: false,
  loadingDoc: false,
  loadingCategories: false,
  loadingSearch: false,
  loadingFeatured: false,
  loadingRelated: false,
  error: null,
  searchError: null,
  totalDocs: 0,
  currentPage: 1,
  docsPerPage: 20,
  hasMore: true,
  searchQuery: '',
  searchCategory: null,
  health: null,
  circuitBreakerOpen: false,
  selectedCategory: null,
  sortBy: 'created_at',
  sortOrder: 'desc',
}

// Reducer
function docsReducer(state: DocsState, action: DocsAction): DocsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_LOADING_DOC':
      return { ...state, loadingDoc: action.payload }
    case 'SET_LOADING_CATEGORIES':
      return { ...state, loadingCategories: action.payload }
    case 'SET_LOADING_SEARCH':
      return { ...state, loadingSearch: action.payload }
    case 'SET_LOADING_FEATURED':
      return { ...state, loadingFeatured: action.payload }
    case 'SET_LOADING_RELATED':
      return { ...state, loadingRelated: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SEARCH_ERROR':
      return { ...state, searchError: action.payload }
    case 'SET_DOCS':
      return { 
        ...state, 
        docs: action.payload.docs, 
        totalDocs: action.payload.total,
        hasMore: action.payload.docs.length === state.docsPerPage
      }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_FEATURED_DOCS':
      return { ...state, featuredDocs: action.payload }
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload }
    case 'SET_CURRENT_DOC':
      return { ...state, currentDoc: action.payload }
    case 'SET_RELATED_DOCS':
      return { ...state, relatedDocs: action.payload }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_SEARCH_CATEGORY':
      return { ...state, searchCategory: action.payload }
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder }
    case 'SET_HEALTH':
      return { ...state, health: action.payload }
    case 'SET_CIRCUIT_BREAKER':
      return { ...state, circuitBreakerOpen: action.payload }
    case 'ADD_DOC':
      return { ...state, docs: [action.payload, ...state.docs] }
    case 'UPDATE_DOC':
      return { 
        ...state, 
        docs: state.docs.map(doc => doc.id === action.payload.id ? action.payload : doc),
        currentDoc: state.currentDoc?.id === action.payload.id ? action.payload : state.currentDoc
      }
    case 'DELETE_DOC':
      return { 
        ...state, 
        docs: state.docs.filter(doc => doc.id !== action.payload),
        currentDoc: state.currentDoc?.id === action.payload ? null : state.currentDoc
      }
    case 'INCREMENT_VIEWS':
      return {
        ...state,
        docs: state.docs.map(doc => 
          doc.id === action.payload.docId 
            ? { ...doc, views: action.payload.views }
            : doc
        ),
        currentDoc: state.currentDoc?.id === action.payload.docId 
          ? { ...state.currentDoc, views: action.payload.views }
          : state.currentDoc
      }
    case 'UPDATE_RATING':
      return {
        ...state,
        docs: state.docs.map(doc => 
          doc.id === action.payload.docId 
            ? { ...doc, rating: action.payload.rating }
            : doc
        ),
        currentDoc: state.currentDoc?.id === action.payload.docId 
          ? { ...state.currentDoc, rating: action.payload.rating }
          : state.currentDoc
      }
    default:
      return state
  }
}

// Context
interface DocsContextType {
  state: DocsState
  // Actions
  loadDocs: (page?: number, category?: string) => Promise<void>
  loadDocById: (docId: string) => Promise<void>
  loadDocBySlug: (slug: string) => Promise<void>
  loadCategories: () => Promise<void>
  loadFeaturedDocs: () => Promise<void>
  loadRelatedDocs: (docId: string) => Promise<void>
  searchDocs: (query: string, category?: string) => Promise<void>
  clearSearch: () => void
  setSelectedCategory: (category: string | null) => void
  setSort: (sortBy: DocsState['sortBy'], sortOrder: 'asc' | 'desc') => void
  incrementViews: (docId: string) => Promise<void>
  rateDoc: (docId: string, rating: number) => Promise<void>
  checkHealth: () => Promise<void>
  resetCircuitBreaker: () => void
  clearError: () => void
  clearSearchError: () => void
}

const DocsContext = createContext<DocsContextType | undefined>(undefined)

// Provider
export function DocsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(docsReducer, initialState)

  // Health check with auto-refresh
  const checkHealth = useCallback(async () => {
    try {
      const health = await DocsService.checkHealth()
      dispatch({ type: 'SET_HEALTH', payload: health })
      dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: DocsService.isCircuitBreakerOpen() })
    } catch (error) {
      console.error('Health check failed:', error)
    }
  }, [])

  // Auto-refresh health every 30 seconds
  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [checkHealth])

  // Load all documentation
  const loadDocs = useCallback(async (page = 1, category?: string) => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const offset = (page - 1) * state.docsPerPage
      const response = await DocsService.getAllDocs(state.docsPerPage, offset, category)
      
      if (response.success && response.data) {
        const docs = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_DOCS', payload: { docs, total: docs.length } })
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load docs' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load docs' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.docsPerPage])

  // Load documentation by ID
  const loadDocById = useCallback(async (docId: string) => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_DOC', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DocsService.getDocById(docId)
      
      if (response.success && response.data) {
        const doc = response.data as DocItem
        dispatch({ type: 'SET_CURRENT_DOC', payload: doc })
        // Increment views
        await incrementViews(docId)
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load doc' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load doc' })
    } finally {
      dispatch({ type: 'SET_LOADING_DOC', payload: false })
    }
  }, [])

  // Load documentation by slug
  const loadDocBySlug = useCallback(async (slug: string) => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_DOC', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DocsService.getDocBySlug(slug)
      
      if (response.success && response.data) {
        const doc = response.data as DocItem
        dispatch({ type: 'SET_CURRENT_DOC', payload: doc })
        // Increment views
        await incrementViews(doc.id)
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load doc' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load doc' })
    } finally {
      dispatch({ type: 'SET_LOADING_DOC', payload: false })
    }
  }, [])

  // Load categories
  const loadCategories = useCallback(async () => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_CATEGORIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DocsService.getCategories()
      
      if (response.success && response.data) {
        const categories = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_CATEGORIES', payload: categories })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load categories' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load categories' })
    } finally {
      dispatch({ type: 'SET_LOADING_CATEGORIES', payload: false })
    }
  }, [])

  // Load featured docs
  const loadFeaturedDocs = useCallback(async () => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_FEATURED', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DocsService.getFeaturedDocs()
      
      if (response.success && response.data) {
        const docs = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_FEATURED_DOCS', payload: docs })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load featured docs' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load featured docs' })
    } finally {
      dispatch({ type: 'SET_LOADING_FEATURED', payload: false })
    }
  }, [])

  // Load related docs
  const loadRelatedDocs = useCallback(async (docId: string) => {
    if (DocsService.isCircuitBreakerOpen()) {
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_RELATED', payload: true })
      
      const response = await DocsService.getRelatedDocs(docId)
      
      if (response.success && response.data) {
        const docs = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_RELATED_DOCS', payload: docs })
      }
    } catch (error) {
      console.error('Failed to load related docs:', error)
    } finally {
      dispatch({ type: 'SET_LOADING_RELATED', payload: false })
    }
  }, [])

  // Search docs
  const searchDocs = useCallback(async (query: string, category?: string) => {
    if (DocsService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_SEARCH_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_SEARCH', payload: true })
      dispatch({ type: 'SET_SEARCH_ERROR', payload: null })
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
      dispatch({ type: 'SET_SEARCH_CATEGORY', payload: category || null })
      
      const response = await DocsService.searchDocs(query, 10, 0, category)
      
      if (response.success && response.data) {
        const results = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: results })
      } else {
        dispatch({ type: 'SET_SEARCH_ERROR', payload: response.error || 'Failed to search docs' })
      }
    } catch (error) {
      dispatch({ type: 'SET_SEARCH_ERROR', payload: error instanceof Error ? error.message : 'Failed to search docs' })
    } finally {
      dispatch({ type: 'SET_LOADING_SEARCH', payload: false })
    }
  }, [])

  // Clear search
  const clearSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })
    dispatch({ type: 'SET_SEARCH_CATEGORY', payload: null })
    dispatch({ type: 'SET_SEARCH_ERROR', payload: null })
  }, [])

  // Set selected category
  const setSelectedCategory = useCallback((category: string | null) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category })
    if (category) {
      loadDocs(1, category)
    } else {
      loadDocs(1)
    }
  }, [loadDocs])

  // Set sort
  const setSort = useCallback((sortBy: DocsState['sortBy'], sortOrder: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } })
    // Reload docs with new sort
    loadDocs(1, state.selectedCategory || undefined)
  }, [loadDocs, state.selectedCategory])

  // Increment views
  const incrementViews = useCallback(async (docId: string) => {
    try {
      const response = await DocsService.incrementViews(docId)
      if (response.success && response.data) {
        const doc = response.data as DocItem
        dispatch({ type: 'INCREMENT_VIEWS', payload: { docId, views: doc.views } })
      }
    } catch (error) {
      console.error('Failed to increment views:', error)
    }
  }, [])

  // Rate doc
  const rateDoc = useCallback(async (docId: string, rating: number) => {
    try {
      const response = await DocsService.rateDoc(docId, rating)
      if (response.success && response.data) {
        const doc = response.data as DocItem
        dispatch({ type: 'UPDATE_RATING', payload: { docId, rating: doc.rating || rating } })
      }
    } catch (error) {
      console.error('Failed to rate doc:', error)
    }
  }, [])

  // Reset circuit breaker
  const resetCircuitBreaker = useCallback(() => {
    DocsService.resetCircuitBreaker()
    dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: false })
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  // Clear search error
  const clearSearchError = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_ERROR', payload: null })
  }, [])

  const value: DocsContextType = {
    state,
    loadDocs,
    loadDocById,
    loadDocBySlug,
    loadCategories,
    loadFeaturedDocs,
    loadRelatedDocs,
    searchDocs,
    clearSearch,
    setSelectedCategory,
    setSort,
    incrementViews,
    rateDoc,
    checkHealth,
    resetCircuitBreaker,
    clearError,
    clearSearchError,
  }

  return (
    <DocsContext.Provider value={value}>
      {children}
    </DocsContext.Provider>
  )
}

// Hook
export function useDocs() {
  const context = useContext(DocsContext)
  if (context === undefined) {
    throw new Error('useDocs must be used within a DocsProvider')
  }
  return context
} 