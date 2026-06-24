import { ReadTaskDTO } from "./read.task.dto";

export class ReadManyTasksDTO {
  data: {
  id: string;
  name: string;
  status: number;
  tasks: ReadTaskDTO[];
  }[]
}
