// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DBModule } from 'src/db/db';
import { UsersService } from 'src/db/users/users.service';

@Module({
  imports: [
    DBModule, // Импортируем, чтобы использовать UsersService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SUPER_SECRET_KEY', // Лучше выносить в .env
      signOptions: { expiresIn: '1d' }, // Токен будет валиден 1 день
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
