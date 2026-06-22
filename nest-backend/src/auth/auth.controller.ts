// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, ReadUserDTO } from 'src/db/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDTO) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: ReadUserDTO) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() id: string, rt:string) {
    return this.authService.refreshTokens(id, rt);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() id: string) {
    return this.authService.logout(id);
  }
}
