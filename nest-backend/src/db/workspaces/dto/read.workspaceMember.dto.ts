import { Role } from '@prisma/client';
import { IsUUID, Length } from 'class-validator';

export class ReadWorkspaceMemberDTO {
  userId: string;
  workspaceId: string;
  name: string;
  role: Role;
}
