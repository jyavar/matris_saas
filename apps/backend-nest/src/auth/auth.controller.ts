import {
  Body,
  Controller,
  Post,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  SignInDto,
  AuthResponseDto,
  SignInResponseDto,
} from './dto/auth.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SignUpDto,
  ): Promise<AuthResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('signin')
  @Throttle({ default: { limit: 5, ttl: 900_000 } })
  @HttpCode(200)
  async signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SignInDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }
}
