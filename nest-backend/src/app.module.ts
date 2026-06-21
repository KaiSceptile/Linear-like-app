import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DBModule } from './db/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    PrismaModule, // Просто подключаем наш глобальный модуль Prisma
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}