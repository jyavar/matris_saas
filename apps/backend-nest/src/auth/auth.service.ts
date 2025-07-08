import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { supabase } from '../lib/supabase';
import {
  AuthResponseDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
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
        if (error.message === 'Invalid login credentials') {
          throw new UnauthorizedException('Invalid login credentials');
        }
        throw new BadRequestException(error.message);
      }

      if (!data.session || !data.user) {
        throw new UnauthorizedException('Could not sign in');
      }

      return {
        access_token: data.session.access_token,
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
}
