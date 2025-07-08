import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityLoggerService } from '../security/security-logger.service';

import { supabase } from '../lib/supabase';
import {
  AuthResponseDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  RefreshTokenDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private securityLogger: SecurityLoggerService,
  ) {}
  async signUp(credentials: SignUpDto): Promise<AuthResponseDto> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new BadRequestException(error.message);
      }

      if (!data.user) {
        throw new BadRequestException('Error al crear usuario');
      }

      this.securityLogger.logAuthSuccess(data.user.id, data.user.email || '');

      return {
        id: data.user.id,
        email: data.user.email || '',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear usuario');
    }
  }

  async signIn(credentials: SignInDto): Promise<SignInResponseDto> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        this.securityLogger.logAuthFailure(
          credentials.email,
          undefined,
          undefined,
          error.message,
        );
        if (error.message === 'Invalid login credentials') {
          throw new UnauthorizedException('Invalid login credentials');
        }
        throw new BadRequestException(error.message);
      }

      if (!data.session || !data.user) {
        throw new UnauthorizedException('Could not sign in');
      }

      this.securityLogger.logAuthSuccess(data.user.id, data.user.email || '');

      return {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token || '',
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Could not sign in');
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<SignInResponseDto> {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshTokenDto.refresh_token,
      });

      if (error) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (!data.session || !data.user) {
        throw new UnauthorizedException('Could not refresh token');
      }

      return {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token || '',
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
      };
    } catch {
      throw new UnauthorizedException('Could not refresh token');
    }
  }

  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch {
      throw new BadRequestException('Error signing out');
    }
  }
}
