import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SignUpDto, SignInDto, AuthResponseDto, SignInResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async signUp(credentials: SignUpDto): Promise<AuthResponseDto> {
    try {
      // Mock implementation for now - will integrate with Supabase later
      const mockUser = {
        id: 1,
        email: credentials.email,
      };

      return mockUser;
    } catch (error) {
      throw new BadRequestException('Error al crear usuario');
    }
  }

  async signIn(credentials: SignInDto): Promise<SignInResponseDto> {
    try {
      // Mock implementation for now - will integrate with Supabase later
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        const mockUser = {
          id: 1,
          email: credentials.email,
        };

        const mockSession = {
          access_token: 'mock-jwt-token-' + Date.now(),
        };

        return {
          access_token: mockSession.access_token,
          user: mockUser,
        };
      } else {
        throw new UnauthorizedException('Invalid login credentials');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Could not sign in');
    }
  }
} 