import { IsDate, IsOptional, Length } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { Priority } from '@prisma/client';

export class CreateTaskDTO {
  @Length(2, 100)
  name: string;

  @Length(2, 1000)
  description: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  priority: Priority;

  position: number;
  
  createdById: string;

  columnId: string;
}