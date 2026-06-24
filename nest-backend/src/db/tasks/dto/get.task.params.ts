import { IsUUID } from "class-validator";

export class GetTaskParams{
  @IsUUID(4)
  taskId: string;
}