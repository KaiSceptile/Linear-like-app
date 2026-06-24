import { ReadBoardDTO } from "src/db/boards/dto/read.board.dto";
import { ReadWorkspaceMemberDTO } from "./read.workspaceMember.dto";

export class ReadWorkspaceDTO {
  id: string;

  name: string;

  members: ReadWorkspaceMemberDTO[];

  boards: ReadBoardDTO[];
}
