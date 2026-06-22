// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, ReadUserDTO } from 'src/db/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: CreateUserDTO) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() {email, password}) {
    return this.authService.login({email, password});
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() id: string, rt: string) {
    return this.authService.refreshTokens(id, rt);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() id: string) {
    return this.authService.logout(id);
  }
}
