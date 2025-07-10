import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  RefreshTokenDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Throttle({ short: { limit: 3, ttl: 60_000 } })
  @HttpCode(201)
  async signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SignUpDto,
  ): Promise<AuthResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('signin')
  @Throttle({ short: { limit: 5, ttl: 60_000 } })
  @HttpCode(200)
  async signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SignInDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }

  @Post('refresh')
  @Throttle({ medium: { limit: 10, ttl: 900_000 } })
  @HttpCode(200)
  async refresh(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: RefreshTokenDto,
  ): Promise<SignInResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Post('signout')
  @HttpCode(200)
  async signOut(): Promise<{ message: string }> {
    await this.authService.signOut();
    return { message: 'Successfully signed out' };
  }
}
