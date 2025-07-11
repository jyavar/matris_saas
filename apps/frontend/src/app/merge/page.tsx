'use client'

import React, { useEffect, useState } from 'react'
import { useMerge } from '../../contexts/MergeContext'
import { MergeConnectionStatus } from '../../components/merge/ConnectionStatus'
import { MergeStrategy, MergeRequest, MergeConflict } from '../../services/merge.service'

export default function MergePage() {
  const { 
    state, 
    loadStrategies, 
    loadRequests, 
    createStrategy, 
    createRequest, 
    executeMerge, 
    approveRequest,
    loadConflicts,
    resolveConflict,
    analyzeImpact,
    setStatusFilter,
    setStrategyFilter,
    clearError,
    clearMergeError
  } = useMerge()
  
  const [activeTab, setActiveTab] = useState<'strategies' | 'requests' | 'conflicts' | 'analysis'>('strategies')
  const [showCreateStrategy, setShowCreateStrategy] = useState(false)
  const [showCreateRequest, setShowCreateRequest] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MergeRequest | null>(null)

  // Load initial data
  useEffect(() => {
    loadStrategies()
    loadRequests()
  }, [loadStrategies, loadRequests])

  // Handle create strategy
  const handleCreateStrategy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const strategy = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as 'squash' | 'merge' | 'rebase' | 'fast-forward',
      auto_resolve_conflicts: formData.get('auto_resolve_conflicts') === 'on',
      require_review: formData.get('require_review') === 'on',
      require_tests: formData.get('require_tests') === 'on',
      require_approval: formData.get('require_approval') === 'on',
      min_approvals: parseInt(formData.get('min_approvals') as string) || 1,
      protected_branches: (formData.get('protected_branches') as string).split(',').map(b => b.trim()).filter(Boolean),
      is_active: true,
      priority: parseInt(formData.get('priority') as string) || 1,
    }

    await createStrategy(strategy)
    setShowCreateStrategy(false)
    e.currentTarget.reset()
  }

  // Handle create request
  const handleCreateRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const request = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      source_branch: formData.get('source_branch') as string,
      target_branch: formData.get('target_branch') as string,
      author: formData.get('author') as string,
      reviewers: (formData.get('reviewers') as string).split(',').map(r => r.trim()).filter(Boolean),
      strategy: state.strategies[0], // Default strategy
    }

    await createRequest(request)
    setShowCreateRequest(false)
    e.currentTarget.reset()
  }

  // Handle execute merge
  const handleExecuteMerge = async (requestId: string, strategyId: string) => {
    await executeMerge(requestId, strategyId)
  }

  // Handle approve request
  const handleApproveRequest = async (requestId: string) => {
    await approveRequest(requestId)
  }

  // Handle resolve conflict
  const handleResolveConflict = async (conflictId: string, resolution: string) => {
    await resolveConflict(conflictId, resolution)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: 'Abierto', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
      merged: { label: 'Mergeado', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
      closed: { label: 'Cerrado', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' },
      conflict: { label: 'Conflicto', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
      review_required: { label: 'Revisión', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Get strategy type icon
  const getStrategyTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      squash: '🔀',
      merge: '🔗',
      rebase: '📈',
      'fast-forward': '⚡'
    }
    return icons[type] || '📄'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestión de Merge
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Estrategias de merge, resolución de conflictos y análisis de impacto
              </p>
            </div>
            <MergeConnectionStatus showDetails />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 dark:text-red-400 font-medium">
                  Error: {state.error}
                </span>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {state.mergeError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 dark:text-red-400 font-medium">
                  Error de Merge: {state.mergeError}
                </span>
              </div>
              <button
                onClick={clearMergeError}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'strategies', label: 'Estrategias', count: state.strategies.length },
                { id: 'requests', label: 'Merge Requests', count: state.mergeRequests.length },
                { id: 'conflicts', label: 'Conflictos', count: state.conflicts.length },
                { id: 'analysis', label: 'Análisis', count: state.analysis ? 1 : 0 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Strategies Tab */}
            {activeTab === 'strategies' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Estrategias de Merge
                  </h2>
                  <button
                    onClick={() => setShowCreateStrategy(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Nueva Estrategia
                  </button>
                </div>

                {state.loadingStrategies ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando estrategias...</span>
                  </div>
                ) : state.strategies.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay estrategias</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Crea tu primera estrategia de merge para comenzar.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.strategies.map((strategy) => (
                      <div key={strategy.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getStrategyTypeIcon(strategy.type)}</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {strategy.name}
                            </h3>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            strategy.is_active 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}>
                            {strategy.is_active ? 'Activa' : 'Inactiva'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {strategy.description}
                        </p>
                        <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <span>Tipo: {strategy.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Auto-resolver: {strategy.auto_resolve_conflicts ? 'Sí' : 'No'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Revisión: {strategy.require_review ? 'Sí' : 'No'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Tests: {strategy.require_tests ? 'Sí' : 'No'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Aprobaciones: {strategy.min_approvals}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Merge Requests
                  </h2>
                  <button
                    onClick={() => setShowCreateRequest(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Nuevo Request
                  </button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <select
                    onChange={(e) => setStatusFilter(e.target.value || null)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Todos los estados</option>
                    <option value="open">Abierto</option>
                    <option value="merged">Mergeado</option>
                    <option value="closed">Cerrado</option>
                    <option value="conflict">Conflicto</option>
                    <option value="review_required">Revisión</option>
                  </select>
                </div>

                {state.loadingRequests ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando requests...</span>
                  </div>
                ) : state.mergeRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay merge requests</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Crea tu primer merge request para comenzar.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.mergeRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {request.title}
                              </h3>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span>📁 {request.source_branch} → {request.target_branch}</span>
                              <span>👤 {request.author}</span>
                              <span>📅 {formatDate(request.created_at)}</span>
                              <span>📄 {request.files_changed} archivos</span>
                              <span>➕ {request.additions} +{request.deletions} -</span>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            {request.status === 'open' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                                >
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => handleExecuteMerge(request.id, request.strategy.id)}
                                  disabled={state.executingMerge}
                                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                                >
                                  {state.executingMerge ? 'Mergeando...' : 'Mergear'}
                                </button>
                              </>
                            )}
                            {request.status === 'conflict' && (
                              <button
                                onClick={() => {
                                  setSelectedRequest(request)
                                  loadConflicts(request.id)
                                  setActiveTab('conflicts')
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                              >
                                Resolver Conflictos
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Conflicts Tab */}
            {activeTab === 'conflicts' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Conflictos de Merge
                </h2>

                {state.loadingConflicts ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando conflictos...</span>
                  </div>
                ) : state.conflicts.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay conflictos</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Todos los merges están sin conflictos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.conflicts.map((conflict) => (
                      <div key={conflict.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {conflict.file_path}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Tipo: {conflict.conflict_type} | Estado: {conflict.status}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            conflict.status === 'resolved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {conflict.status === 'resolved' ? 'Resuelto' : 'Pendiente'}
                          </span>
                        </div>
                        {conflict.status === 'unresolved' && (
                          <div className="mt-4">
                            <textarea
                              placeholder="Ingresa la resolución del conflicto..."
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                              rows={4}
                            />
                            <button
                              onClick={() => {
                                const resolution = (document.querySelector(`textarea[placeholder*="resolución"]`) as HTMLTextAreaElement)?.value
                                if (resolution) {
                                  handleResolveConflict(conflict.id, resolution)
                                }
                              }}
                              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Resolver Conflicto
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analysis Tab */}
            {activeTab === 'analysis' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Análisis de Impacto
                </h2>

                {state.loadingAnalysis ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Analizando impacto...</span>
                  </div>
                ) : state.analysis ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Información del Análisis
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Nivel de Riesgo:</span>
                            <span className={`font-medium ${
                              state.analysis.risk_level === 'low' ? 'text-green-600' :
                              state.analysis.risk_level === 'medium' ? 'text-yellow-600' :
                              state.analysis.risk_level === 'high' ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {state.analysis.risk_level.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Puntuación de Seguridad:</span>
                            <span className="font-medium">{state.analysis.safety_score}/100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Archivos Afectados:</span>
                            <span className="font-medium">{state.analysis.impact_analysis.files_affected}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Cambios Breaking:</span>
                            <span className="font-medium">{state.analysis.impact_analysis.breaking_changes ? 'Sí' : 'No'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Cobertura de Tests:</span>
                            <span className="font-medium">{state.analysis.impact_analysis.test_coverage}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Puntuación de Complejidad:</span>
                            <span className="font-medium">{state.analysis.impact_analysis.complexity_score}/10</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Recomendaciones
                        </h3>
                        <ul className="space-y-2">
                          {state.analysis.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span className="text-gray-600 dark:text-gray-400 text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay análisis disponible</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Selecciona un merge request para analizar su impacto.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Create Strategy Modal */}
        {showCreateStrategy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Nueva Estrategia de Merge
              </h3>
              <form onSubmit={handleCreateStrategy} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="squash">Squash</option>
                    <option value="merge">Merge</option>
                    <option value="rebase">Rebase</option>
                    <option value="fast-forward">Fast Forward</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" name="auto_resolve_conflicts" className="mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Auto-resolver conflictos</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="require_review" className="mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Requiere revisión</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="require_tests" className="mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Requiere tests</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="require_approval" className="mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Requiere aprobación</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mínimo de Aprobaciones
                  </label>
                  <input
                    type="number"
                    name="min_approvals"
                    min="1"
                    defaultValue="1"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Branches Protegidos (separados por coma)
                  </label>
                  <input
                    type="text"
                    name="protected_branches"
                    placeholder="main, develop"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prioridad
                  </label>
                  <input
                    type="number"
                    name="priority"
                    min="1"
                    defaultValue="1"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Crear Estrategia
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateStrategy(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Request Modal */}
        {showCreateRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Nuevo Merge Request
              </h3>
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Branch Origen
                  </label>
                  <input
                    type="text"
                    name="source_branch"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Branch Destino
                  </label>
                  <input
                    type="text"
                    name="target_branch"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Revisores (separados por coma)
                  </label>
                  <input
                    type="text"
                    name="reviewers"
                    placeholder="usuario1, usuario2"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Crear Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateRequest(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 