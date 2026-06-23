import { ReadWorkspaceMemberDTO } from "./read.workspaceMember.dto";

export class ReadWorkspaceDTO {
  id: string;
  
  name: string;

  members: ReadWorkspaceMemberDTO[];
}
