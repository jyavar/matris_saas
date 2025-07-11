import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ProfilesProvider, useProfiles } from '../contexts/ProfilesContext'
import ConnectionStatus from '../components/profiles/ConnectionStatus'

// Mock the profiles service
vi.mock('../services/profiles.service', () => ({
  ProfilesService: {
    checkHealth: vi.fn(),
    getCurrentProfile: vi.fn(),
    getProfileById: vi.fn(),
    updateProfile: vi.fn(),
    uploadAvatar: vi.fn(),
    deleteAvatar: vi.fn(),
    getActivity: vi.fn(),
    searchProfiles: vi.fn(),
    getCircuitBreakerState: vi.fn(),
    resetCircuitBreaker: vi.fn(),
    isCircuitBreakerOpen: vi.fn(),
  }
}))

// Mock the supabase lib
vi.mock('../lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Import the mocked service
import { ProfilesService } from '../services/profiles.service'

// Test component to access context
function TestComponent() {
  const { 
    state, 
    getCurrentProfile, 
    getProfileById, 
    updateProfile, 
    uploadAvatar, 
    deleteAvatar, 
    getActivity, 
    searchProfiles, 
    clearError, 
    retryConnection, 
    refreshData, 
    resetCircuitBreaker 
  } = useProfiles()
  
  return (
    <div>
      <div data-testid="connection-status">{state.connectionStatus}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      <div data-testid="current-profile">{state.currentProfile ? state.currentProfile.full_name : 'no-profile'}</div>
      <div data-testid="search-results">{state.searchResults.length}</div>
      <div data-testid="activity-count">{state.activity.length}</div>
      <button onClick={() => getCurrentProfile()}>Get Profile</button>
      <button onClick={() => getProfileById('test-id')}>Get Profile By ID</button>
      <button onClick={() => updateProfile({ full_name: 'Updated Name' })}>Update Profile</button>
      <button onClick={() => uploadAvatar(new File([''], 'test.jpg'))}>Upload Avatar</button>
      <button onClick={() => deleteAvatar()}>Delete Avatar</button>
      <button onClick={() => getActivity()}>Get Activity</button>
      <button onClick={() => searchProfiles('test')}>Search Profiles</button>
      <button onClick={clearError}>Clear Error</button>
      <button onClick={() => retryConnection()}>Retry</button>
      <button onClick={() => refreshData()}>Refresh</button>
      <button onClick={resetCircuitBreaker}>Reset Circuit</button>
    </div>
  )
}

describe('Profiles Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful health check
    vi.mocked(ProfilesService.checkHealth).mockResolvedValue({
      isHealthy: true,
      lastCheck: Date.now(),
      responseTime: 100,
      errorRate: 0,
    })

    // Default circuit breaker state
    vi.mocked(ProfilesService.getCircuitBreakerState).mockReturnValue({
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED' as const,
    })

    // Default current profile
    vi.mocked(ProfilesService.getCurrentProfile).mockResolvedValue({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
        bio: 'Test bio',
        location: 'Test City',
        website: 'https://example.com',
        company: 'Test Company',
        job_title: 'Developer',
        phone: '+1234567890',
        timezone: 'UTC',
        language: 'en',
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
          privacy: {
            profile_visible: true,
            activity_visible: false,
          },
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        status: 'active',
      },
    })

    // Default profile by ID
    vi.mocked(ProfilesService.getProfileById).mockResolvedValue({
      success: true,
      data: {
        id: 'test-id',
        email: 'other@example.com',
        full_name: 'Other User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
          privacy: {
            profile_visible: true,
            activity_visible: true,
          },
        },
      },
    })

    // Default update profile
    vi.mocked(ProfilesService.updateProfile).mockResolvedValue({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Updated Name',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
          privacy: {
            profile_visible: true,
            activity_visible: false,
          },
        },
      },
    })

    // Default upload avatar
    vi.mocked(ProfilesService.uploadAvatar).mockResolvedValue({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Test User',
        avatar_url: 'https://example.com/new-avatar.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
          privacy: {
            profile_visible: true,
            activity_visible: false,
          },
        },
      },
    })

    // Default delete avatar
    vi.mocked(ProfilesService.deleteAvatar).mockResolvedValue({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Test User',
        avatar_url: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
          privacy: {
            profile_visible: true,
            activity_visible: false,
          },
        },
      },
    })

    // Default activity
    vi.mocked(ProfilesService.getActivity).mockResolvedValue({
      success: true,
      data: [
        {
          id: '1',
          type: 'profile_update',
          description: 'Profile updated',
          timestamp: new Date().toISOString(),
        },
      ],
    })

    // Default search profiles
    vi.mocked(ProfilesService.searchProfiles).mockResolvedValue({
      success: true,
      data: [
        {
          id: '2',
          email: 'search@example.com',
          full_name: 'Search User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'active',
          preferences: {
            theme: 'light',
            notifications: {
              email: true,
              push: true,
              sms: false,
            },
            privacy: {
              profile_visible: true,
              activity_visible: true,
            },
          },
        },
      ],
    })
  })

  describe('ProfilesContext', () => {
    it('should initialize with disconnected status', () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      expect(screen.getByTestId('connection-status')).toHaveTextContent('disconnected')
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      expect(screen.getByTestId('current-profile')).toHaveTextContent('no-profile')
    })

    it('should connect successfully on mount', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      })

      expect(ProfilesService.checkHealth).toHaveBeenCalled()
      expect(ProfilesService.getCurrentProfile).toHaveBeenCalled()
      expect(ProfilesService.getActivity).toHaveBeenCalled()
    })

    it('should get current profile', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Profile'))

      await waitFor(() => {
        expect(screen.getByTestId('current-profile')).toHaveTextContent('Test User')
      })

      expect(ProfilesService.getCurrentProfile).toHaveBeenCalled()
    })

    it('should get profile by ID', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Profile By ID'))

      expect(ProfilesService.getProfileById).toHaveBeenCalledWith('test-id')
    })

    it('should update profile', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Update Profile'))

      await waitFor(() => {
        expect(screen.getByTestId('current-profile')).toHaveTextContent('Updated Name')
      })

      expect(ProfilesService.updateProfile).toHaveBeenCalledWith({ full_name: 'Updated Name' })
    })

    it('should upload avatar', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Upload Avatar'))

      expect(ProfilesService.uploadAvatar).toHaveBeenCalled()
    })

    it('should delete avatar', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Delete Avatar'))

      expect(ProfilesService.deleteAvatar).toHaveBeenCalled()
    })

    it('should get activity', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Activity'))

      await waitFor(() => {
        expect(screen.getByTestId('activity-count')).toHaveTextContent('1')
      })

      expect(ProfilesService.getActivity).toHaveBeenCalled()
    })

    it('should search profiles', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Search Profiles'))

      await waitFor(() => {
        expect(screen.getByTestId('search-results')).toHaveTextContent('1')
      })

      expect(ProfilesService.searchProfiles).toHaveBeenCalledWith('test')
    })

    it('should handle service errors', async () => {
      vi.mocked(ProfilesService.getCurrentProfile).mockResolvedValue({
        success: false,
        error: 'Service unavailable',
      })

      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Profile'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Service unavailable')
      })
    })

    it('should clear errors', async () => {
      vi.mocked(ProfilesService.getCurrentProfile).mockResolvedValue({
        success: false,
        error: 'Service unavailable',
      })

      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Profile'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Service unavailable')
      })

      await user.click(screen.getByText('Clear Error'))

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should retry connection', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Retry'))

      expect(ProfilesService.checkHealth).toHaveBeenCalled()
    })

    it('should refresh data', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Refresh'))

      expect(ProfilesService.getCurrentProfile).toHaveBeenCalled()
      expect(ProfilesService.getActivity).toHaveBeenCalled()
    })

    it('should reset circuit breaker', async () => {
      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Reset Circuit'))

      expect(ProfilesService.resetCircuitBreaker).toHaveBeenCalled()
    })
  })

  describe('ConnectionStatus Component', () => {
    it('should render connection status', async () => {
      render(
        <ProfilesProvider>
          <ConnectionStatus />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      })
    })

    it('should render compact version', async () => {
      render(
        <ProfilesProvider>
          <ConnectionStatus compact />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      })
    })

    it('should show details when showDetails is true', async () => {
      render(
        <ProfilesProvider>
          <ConnectionStatus showDetails />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Circuit Breaker:')).toBeInTheDocument()
        expect(screen.getByText('CLOSED')).toBeInTheDocument()
      })
    })

    it('should handle refresh button click', async () => {
      render(
        <ProfilesProvider>
          <ConnectionStatus />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      const refreshButton = screen.getByLabelText('Refresh profile service status')
      await user.click(refreshButton)

      expect(ProfilesService.checkHealth).toHaveBeenCalled()
    })

    it('should show error state', async () => {
      vi.mocked(ProfilesService.checkHealth).mockResolvedValue({
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: 5000,
        errorRate: 0.8,
      })

      render(
        <ProfilesProvider>
          <ConnectionStatus />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument()
      })
    })

    it('should show connecting state', async () => {
      vi.mocked(ProfilesService.checkHealth).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          isHealthy: true,
          lastCheck: Date.now(),
          responseTime: 100,
          errorRate: 0,
        }), 100))
      )

      render(
        <ProfilesProvider>
          <ConnectionStatus />
        </ProfilesProvider>
      )

      // Should show connecting briefly
      expect(screen.getByText('Connecting')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      vi.mocked(ProfilesService.checkHealth).mockRejectedValue(new Error('Network error'))

      render(
        <ProfilesProvider>
          <TestComponent />
        </ProfilesProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Profile'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      })
    })

    it('should handle circuit breaker open state', async () => {
      vi.mocked(ProfilesService.getCircuitBreakerState).mockReturnValue({
        failures: 10,
        lastFailureTime: Date.now(),
        state: 'OPEN' as const,
      })

      render(
        <ProfilesProvider>
          <ConnectionStatus showDetails />
        </ProfilesProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('OPEN')).toBeInTheDocument()
      })
    })
  })
}) 