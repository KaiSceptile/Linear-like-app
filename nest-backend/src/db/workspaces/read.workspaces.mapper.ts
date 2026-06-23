import { ReadManyWorkspacesDTO, ReadWorkspaceDTO } from "./dto";

type PrismaWorkspaceResponse = {
  id: string;
  name: string;
  users: ({
    user: {
      id: string;
      name: string;
    };
  } & {
    userId: string;
    role: any;
    workspaceId: string;
  })[];
};

export class ReadWorkspacesMapper {


public mapOne(workspace: PrismaWorkspaceResponse): ReadWorkspaceDTO {
  return {
    id: workspace.id,
    name: workspace.name,
    members: workspace.users.map((member) => ({
      userId: member.userId,
      name: member.user.name,
      role: member.role,
    })),
  };
}

public mapMany(workspaces:PrismaWorkspaceResponse[]): ReadManyWorkspacesDTO {
    return {
      data: workspaces.map((one)=>this.mapOne(one))
    }
  }
}