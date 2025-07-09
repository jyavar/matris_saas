import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SignUpDto, SignInDto, RefreshTokenDto, AuthResponseDto, SignInResponseDto } from './dto/auth.dto'

describe('AuthController', () => {
  let controller: AuthController
  let authService: jest.Mocked<AuthService>

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    refreshToken: jest.fn(),
    signOut: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('signUp', () => {
    it('should create a new user account', async () => {
      const signUpData: SignUpDto = {
        email: 'test@example.com',
        password: 'StrongPass123!',
      }

      const expectedResponse: AuthResponseDto = {
        id: 'user-1',
        email: 'test@example.com',
      }

      authService.signUp.mockResolvedValue(expectedResponse)

      const result = await controller.signUp(signUpData)

      expect(authService.signUp).toHaveBeenCalledWith(signUpData)
      expect(result).toEqual(expectedResponse)
    })

    it('should handle signup service errors', async () => {
      const signUpData: SignUpDto = {
        email: 'existing@example.com',
        password: 'StrongPass123!',
      }

      const errorMessage = 'User already exists'
      authService.signUp.mockRejectedValue(new Error(errorMessage))

      await expect(controller.signUp(signUpData)).rejects.toThrow(errorMessage)
      expect(authService.signUp).toHaveBeenCalledWith(signUpData)
    })
  })

  describe('signIn', () => {
    it('should authenticate user and return tokens', async () => {
      const signInData: SignInDto = {
        email: 'test@example.com',
        password: 'StrongPass123!',
      }

      const expectedResponse: SignInResponseDto = {
        user: {
          id: 'user-1',
          email: 'test@example.com',
        },
        access_token: 'access-token-123',
        refresh_token: 'refresh-token-456',
      }

      authService.signIn.mockResolvedValue(expectedResponse)

      const result = await controller.signIn(signInData)

      expect(authService.signIn).toHaveBeenCalledWith(signInData)
      expect(result).toEqual(expectedResponse)
    })

    it('should handle signin service errors', async () => {
      const signInData: SignInDto = {
        email: 'test@example.com',
        password: 'WrongPassword123!',
      }

      const errorMessage = 'Invalid credentials'
      authService.signIn.mockRejectedValue(new Error(errorMessage))

      await expect(controller.signIn(signInData)).rejects.toThrow(errorMessage)
      expect(authService.signIn).toHaveBeenCalledWith(signInData)
    })
  })

  describe('refresh', () => {
    it('should refresh access token', async () => {
      const refreshData: RefreshTokenDto = {
        refresh_token: 'valid-refresh-token',
      }

      const expectedResponse: SignInResponseDto = {
        user: {
          id: 'user-1',
          email: 'test@example.com',
        },
        access_token: 'new-access-token-123',
        refresh_token: 'new-refresh-token-456',
      }

      authService.refreshToken.mockResolvedValue(expectedResponse)

      const result = await controller.refresh(refreshData)

      expect(authService.refreshToken).toHaveBeenCalledWith(refreshData)
      expect(result).toEqual(expectedResponse)
    })

    it('should handle refresh token service errors', async () => {
      const refreshData: RefreshTokenDto = {
        refresh_token: 'invalid-refresh-token',
      }

      const errorMessage = 'Invalid refresh token'
      authService.refreshToken.mockRejectedValue(new Error(errorMessage))

      await expect(controller.refresh(refreshData)).rejects.toThrow(errorMessage)
      expect(authService.refreshToken).toHaveBeenCalledWith(refreshData)
    })
  })

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      authService.signOut.mockResolvedValue(undefined)

      const result = await controller.signOut()

      expect(authService.signOut).toHaveBeenCalled()
      expect(result).toEqual({ message: 'Successfully signed out' })
    })

    it('should handle signout service errors', async () => {
      const errorMessage = 'Signout failed'
      authService.signOut.mockRejectedValue(new Error(errorMessage))

      await expect(controller.signOut()).rejects.toThrow(errorMessage)
      expect(authService.signOut).toHaveBeenCalled()
    })
  })

  describe('Controller Instance', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined()
    })

    it('should have authService injected', () => {
      expect(authService).toBeDefined()
    })
  })
}) 