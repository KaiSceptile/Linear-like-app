import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DBModule } from './db/db';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    AuthModule,
    PrismaModule, // Просто подключаем наш глобальный модуль Prisma
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}