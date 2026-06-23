import { IsDate, IsOptional, Length } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class CreateWorkspaceDTO {
  @Length(2, 100)
  name: string;

  userId: string;
}
