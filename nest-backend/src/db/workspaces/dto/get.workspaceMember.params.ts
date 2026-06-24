import { IsUUID } from "class-validator";

export class GetWorkspaceMemberParams{
  @IsUUID(4)
  workspaceId: string;

  @IsUUID(4)
  userId: string;
}