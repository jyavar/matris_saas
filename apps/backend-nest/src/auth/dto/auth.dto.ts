import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsStrongPassword } from '../validators/password.validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class AuthResponseDto {
  id: string;
  email: string;
}

export class SignInResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
}

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}
