import { IsUUID } from "class-validator";

export class GetBoardParams{
  @IsUUID(4)
  boardId: string;
}