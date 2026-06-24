import { IsDate, IsOptional, Length } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class ReadBoardDTO {
  id: string;
  name: string;
  workspaceId: string;
}