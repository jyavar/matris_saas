import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import type {
  DeployStatus,
  DeployHealth,
  DeployMetrics,
  DeployConfig,
  DeployTask,
  AgentStatus,
  AgentLog,
  DeployLog,
  CreateTaskRequest,
  UpdateConfigRequest,
  RunAgentRequest,
  DeployResponse,
} from '../services/deploy.service'
import { deployService } from '../services/deploy.service'

// Estado del contexto
interface DeployState {
  // Status y Health
  status: DeployStatus | null
  health: DeployHealth | null
  metrics: DeployMetrics | null
  
  // Configuración
  config: DeployConfig | null
  
  // Agentes
  agents: string[]
  agentStatuses: Record<string, AgentStatus>
  agentLogs: Record<string, AgentLog[]>
  
  // Tareas
  tasks: DeployTask[]
  selectedTask: DeployTask | null
  
  // Logs del sistema
  systemLogs: DeployLog[]
  
  // Estados de carga
  loading: {
    status: boolean
    health: boolean
    metrics: boolean
    config: boolean
    agents: boolean
    tasks: boolean
    logs: boolean
  }
  
  // Estados de error
  errors: {
    status: string | null
    health: string | null
    metrics: string | null
    config: string | null
    agents: string | null
    tasks: string | null
    logs: string | null
  }
}

// Acciones del reducer
type DeployAction =
  | { type: 'SET_LOADING'; payload: { key: keyof DeployState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof DeployState['errors']; value: string | null } }
  | { type: 'SET_STATUS'; payload: DeployStatus }
  | { type: 'SET_HEALTH'; payload: DeployHealth }
  | { type: 'SET_METRICS'; payload: DeployMetrics }
  | { type: 'SET_CONFIG'; payload: DeployConfig }
  | { type: 'SET_AGENTS'; payload: string[] }
  | { type: 'SET_AGENT_STATUS'; payload: { name: string; status: AgentStatus } }
  | { type: 'SET_AGENT_LOGS'; payload: { name: string; logs: AgentLog[] } }
  | { type: 'SET_TASKS'; payload: DeployTask[] }
  | { type: 'SET_SELECTED_TASK'; payload: DeployTask | null }
  | { type: 'SET_SYSTEM_LOGS'; payload: DeployLog[] }
  | { type: 'ADD_TASK'; payload: DeployTask }
  | { type: 'UPDATE_TASK'; payload: DeployTask }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'RESET_STATE' }

// Estado inicial
const initialState: DeployState = {
  status: null,
  health: null,
  metrics: null,
  config: null,
  agents: [],
  agentStatuses: {},
  agentLogs: {},
  tasks: [],
  selectedTask: null,
  systemLogs: [],
  loading: {
    status: false,
    health: false,
    metrics: false,
    config: false,
    agents: false,
    tasks: false,
    logs: false,
  },
  errors: {
    status: null,
    health: null,
    metrics: null,
    config: null,
    agents: null,
    tasks: null,
    logs: null,
  },
}

// Reducer
function deployReducer(state: DeployState, action: DeployAction): DeployState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.value,
        },
      }
    
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
        errors: { ...state.errors, status: null },
      }
    
    case 'SET_HEALTH':
      return {
        ...state,
        health: action.payload,
        errors: { ...state.errors, health: null },
      }
    
    case 'SET_METRICS':
      return {
        ...state,
        metrics: action.payload,
        errors: { ...state.errors, metrics: null },
      }
    
    case 'SET_CONFIG':
      return {
        ...state,
        config: action.payload,
        errors: { ...state.errors, config: null },
      }
    
    case 'SET_AGENTS':
      return {
        ...state,
        agents: action.payload,
        errors: { ...state.errors, agents: null },
      }
    
    case 'SET_AGENT_STATUS':
      return {
        ...state,
        agentStatuses: {
          ...state.agentStatuses,
          [action.payload.name]: action.payload.status,
        },
      }
    
    case 'SET_AGENT_LOGS':
      return {
        ...state,
        agentLogs: {
          ...state.agentLogs,
          [action.payload.name]: action.payload.logs,
        },
      }
    
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        errors: { ...state.errors, tasks: null },
      }
    
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: action.payload,
      }
    
    case 'SET_SYSTEM_LOGS':
      return {
        ...state,
        systemLogs: action.payload,
        errors: { ...state.errors, logs: null },
      }
    
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      }
    
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    
    case 'RESET_STATE':
      return initialState
    
    default:
      return state
  }
}

// Contexto
interface DeployContextType {
  state: DeployState
  // Status y Health
  getStatus: () => Promise<void>
  getHealth: () => Promise<void>
  getMetrics: () => Promise<void>
  
  // Configuración
  getConfig: () => Promise<void>
  updateConfig: (config: UpdateConfigRequest) => Promise<DeployResponse<{ message: string }>>
  
  // Agentes
  getAgents: () => Promise<void>
  startAgent: (name: string) => Promise<DeployResponse<{ message: string }>>
  stopAgent: (name: string) => Promise<DeployResponse<{ message: string }>>
  getAgentStatus: (name: string) => Promise<void>
  getAgentLogs: (name: string) => Promise<void>
  runAgent: (name: string, options?: RunAgentRequest) => Promise<DeployResponse<{ result: unknown }>>
  
  // Tareas
  getTasks: () => Promise<void>
  createTask: (task: CreateTaskRequest) => Promise<DeployResponse<DeployTask>>
  getTaskById: (id: string) => Promise<DeployResponse<DeployTask>>
  updateTask: (id: string, updates: Partial<CreateTaskRequest>) => Promise<DeployResponse<{ message: string }>>
  deleteTask: (id: string) => Promise<DeployResponse<{ message: string }>>
  executeTask: (id: string) => Promise<DeployResponse<{ message: string; taskId: string; status: 'success' | 'failed' }>>
  getTaskResult: (id: string) => Promise<DeployResponse<unknown>>
  selectTask: (task: DeployTask | null) => void
  
  // Logs del sistema
  getLogs: () => Promise<void>
  
  // Control del sistema
  restart: () => Promise<DeployResponse<{ message: string }>>
  shutdown: () => Promise<DeployResponse<{ message: string }>>
  
  // Utilidades
  resetState: () => void
}

const DeployContext = createContext<DeployContextType | undefined>(undefined)

// Provider
interface DeployProviderProps {
  children: ReactNode
}

export function DeployProvider({ children }: DeployProviderProps) {
  const [state, dispatch] = useReducer(deployReducer, initialState)

  // Status y Health
  const getStatus = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'status', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'status', value: null } })
    
    try {
      const response = await deployService.getStatus()
      if (response.success && response.data) {
        dispatch({ type: 'SET_STATUS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'status', value: response.error || 'Failed to get status' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'status', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'status', value: false } })
    }
  }

  const getHealth = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'health', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'health', value: null } })
    
    try {
      const response = await deployService.getHealth()
      if (response.success && response.data) {
        dispatch({ type: 'SET_HEALTH', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'health', value: response.error || 'Failed to get health' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'health', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'health', value: false } })
    }
  }

  const getMetrics = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'metrics', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'metrics', value: null } })
    
    try {
      const response = await deployService.getMetrics()
      if (response.success && response.data) {
        dispatch({ type: 'SET_METRICS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'metrics', value: response.error || 'Failed to get metrics' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'metrics', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'metrics', value: false } })
    }
  }

  // Configuración
  const getConfig = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'config', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'config', value: null } })
    
    try {
      const response = await deployService.getConfig()
      if (response.success && response.data) {
        dispatch({ type: 'SET_CONFIG', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'config', value: response.error || 'Failed to get config' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'config', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'config', value: false } })
    }
  }

  const updateConfig = async (config: UpdateConfigRequest): Promise<DeployResponse<{ message: string }>> => {
    return deployService.updateConfig(config)
  }

  // Agentes
  const getAgents = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'agents', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'agents', value: null } })
    
    try {
      const response = await deployService.getAgents()
      if (response.success && response.data) {
        dispatch({ type: 'SET_AGENTS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'agents', value: response.error || 'Failed to get agents' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'agents', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'agents', value: false } })
    }
  }

  const startAgent = async (name: string): Promise<DeployResponse<{ message: string }>> => {
    return deployService.startAgent(name)
  }

  const stopAgent = async (name: string): Promise<DeployResponse<{ message: string }>> => {
    return deployService.stopAgent(name)
  }

  const getAgentStatus = async (name: string): Promise<void> => {
    try {
      const response = await deployService.getAgentStatus(name)
      if (response.success && response.data) {
        dispatch({ type: 'SET_AGENT_STATUS', payload: { name, status: response.data } })
      }
    } catch (error) {
      console.error('Failed to get agent status:', error)
    }
  }

  const getAgentLogs = async (name: string): Promise<void> => {
    try {
      const response = await deployService.getAgentLogs(name)
      if (response.success && response.data) {
        dispatch({ type: 'SET_AGENT_LOGS', payload: { name, logs: response.data } })
      }
    } catch (error) {
      console.error('Failed to get agent logs:', error)
    }
  }

  const runAgent = async (name: string, options?: RunAgentRequest): Promise<DeployResponse<{ result: unknown }>> => {
    return deployService.runAgent(name, options)
  }

  // Tareas
  const getTasks = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'tasks', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'tasks', value: null } })
    
    try {
      const response = await deployService.getTasks()
      if (response.success && response.data) {
        dispatch({ type: 'SET_TASKS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'tasks', value: response.error || 'Failed to get tasks' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'tasks', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'tasks', value: false } })
    }
  }

  const createTask = async (task: CreateTaskRequest): Promise<DeployResponse<DeployTask>> => {
    const response = await deployService.createTask(task)
    if (response.success && response.data) {
      dispatch({ type: 'ADD_TASK', payload: response.data })
    }
    return response
  }

  const getTaskById = async (id: string): Promise<DeployResponse<DeployTask>> => {
    return deployService.getTaskById(id)
  }

  const updateTask = async (id: string, updates: Partial<CreateTaskRequest>): Promise<DeployResponse<{ message: string }>> => {
    const response = await deployService.updateTask(id, updates)
    if (response.success) {
      // Refresh tasks list
      await getTasks()
    }
    return response
  }

  const deleteTask = async (id: string): Promise<DeployResponse<{ message: string }>> => {
    const response = await deployService.deleteTask(id)
    if (response.success) {
      dispatch({ type: 'REMOVE_TASK', payload: id })
    }
    return response
  }

  const executeTask = async (id: string): Promise<DeployResponse<{ message: string; taskId: string; status: 'success' | 'failed' }>> => {
    return deployService.executeTask(id)
  }

  const getTaskResult = async (id: string): Promise<DeployResponse<unknown>> => {
    return deployService.getTaskResult(id)
  }

  const selectTask = (task: DeployTask | null): void => {
    dispatch({ type: 'SET_SELECTED_TASK', payload: task })
  }

  // Logs del sistema
  const getLogs = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'logs', value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: 'logs', value: null } })
    
    try {
      const response = await deployService.getLogs()
      if (response.success && response.data) {
        dispatch({ type: 'SET_SYSTEM_LOGS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: { key: 'logs', value: response.error || 'Failed to get logs' } })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'logs', value: error instanceof Error ? error.message : 'Unknown error' } })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'logs', value: false } })
    }
  }

  // Control del sistema
  const restart = async (): Promise<DeployResponse<{ message: string }>> => {
    return deployService.restart()
  }

  const shutdown = async (): Promise<DeployResponse<{ message: string }>> => {
    return deployService.shutdown()
  }

  // Utilidades
  const resetState = (): void => {
    dispatch({ type: 'RESET_STATE' })
  }

  const value: DeployContextType = {
    state,
    getStatus,
    getHealth,
    getMetrics,
    getConfig,
    updateConfig,
    getAgents,
    startAgent,
    stopAgent,
    getAgentStatus,
    getAgentLogs,
    runAgent,
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    executeTask,
    getTaskResult,
    selectTask,
    getLogs,
    restart,
    shutdown,
    resetState,
  }

  return (
    <DeployContext.Provider value={value}>
      {children}
    </DeployContext.Provider>
  )
}

// Hook personalizado
export function useDeploy(): DeployContextType {
  const context = useContext(DeployContext)
  if (context === undefined) {
    throw new Error('useDeploy must be used within a DeployProvider')
  }
  return context
} 