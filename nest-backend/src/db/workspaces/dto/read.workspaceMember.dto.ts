import { IsUUID, Length } from 'class-validator';

export class ReadWorkspaceMemberDTO {
  userId: string;
  name: string;
  role: string;
}
