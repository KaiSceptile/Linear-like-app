import { Priority, Tasks } from "@prisma/client";
import { ReadManyTasksDTO, ReadTaskDTO } from "../dto";

type PrismaTasksResponse = ({
    columns: ({
        id: string;
        name: string;
        status: number;
        tasks: {
            id: string;
            name: string;
            description: string;
            priority: Priority;
            position: number;
            createdAt: Date;
            createdById: string;
            columnId: string;
        }[];
    } & {
        id: string;
        name: string;
        status: number;
        boardId: string;
    })[];
} & {
    id: string;
    name: string;
    workspaceId: string;
})[]

export class ReadTasksMapper {
  public mapOne(task: Tasks): ReadTaskDTO {
    return {
    name: task.name,
    id: task.id,
    description: task.description,
    priority: task.priority,
    position: task.position,
    createdAt: task.createdAt,
    createdById: task.createdById,
    columnId: task.columnId,
    }
  }

  public mapMany(tasks:PrismaTasksResponse): ReadManyTasksDTO {
    if (!tasks || tasks.length === 0) {
      return { data: [] };
    }

    const formattedColumns = tasks[0].columns.map((column) => ({ 
      id: column.id, 
      name: column.name, 
      status: column.status, 
      tasks: column.tasks.map(task => this.mapOne(task)) 
    })); 

    return { data: formattedColumns }; 
  }
}