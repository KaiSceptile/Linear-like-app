import { IsUUID } from "class-validator";

export class CreateWorkspaceMemberDTO {
  @IsUUID()
   userId: string;
   
  @IsUUID()
  workspaceId: string;

  role: string;
}
