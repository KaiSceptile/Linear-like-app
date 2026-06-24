import { IsDate, IsOptional, Length } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class CreateBoardDTO {
  @Length(2, 100)
  name: string;

  workspaceId: string;
}