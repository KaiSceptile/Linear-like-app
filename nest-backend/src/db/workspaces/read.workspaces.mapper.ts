import { Role } from "@prisma/client";
import { ReadManyWorkspacesDTO, ReadWorkspaceDTO } from "./dto";

type PrismaWorkspaceResponse = {
 users: ({
 user: {
 id: string;
 name: string;
 };
 } & {
 userId: string;
 workspaceId: string;
 role: Role;
 })[];
 boards: {
 id: string;
 name: string;
 }[];
} & {
 id: string;
 name: string;
}

export class ReadWorkspacesMapper {


public mapOne(workspace: PrismaWorkspaceResponse): ReadWorkspaceDTO {
  return {
    id: workspace.id,
    name: workspace.name,
    members: workspace.users.map((member) => ({
      userId: member.userId,
      workspaceId: member.userId,
      name: member.user.name,
      role: member.role,
    })),
    boards: workspace.boards.map((board) => ({
      id: board.id,
      workspaceId: workspace.id,
      name: board.name,
    })),
  };
}

public mapMany(workspaces:PrismaWorkspaceResponse[]): ReadManyWorkspacesDTO {
    return {
      data: workspaces.map((one)=>this.mapOne(one))
    }
  }
}