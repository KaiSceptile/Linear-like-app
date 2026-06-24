import { Priority } from "@prisma/client";


export class ReadTaskDTO {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  priority: Priority;
  position: number;
  createdById: string;
  columnId: string;
}