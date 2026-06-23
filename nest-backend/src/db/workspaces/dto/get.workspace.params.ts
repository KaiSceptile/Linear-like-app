import { IsUUID } from "class-validator";

export class GetWorkspaceParams{
  @IsUUID(4)
  workspaceId: string;
}