import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Делает модуль доступным везде без повторного импорта
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Экспортируем, чтобы другие сервисы могли его инжектить
})
export class PrismaModule {}