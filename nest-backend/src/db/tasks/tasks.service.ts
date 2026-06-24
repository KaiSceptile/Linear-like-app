import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, ReadManyTasksDTO, ReadManyTasksQueryDTO, ReadTaskDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { ReadTasksMapper } from './mappers/read.tasks.mapper';

@Injectable()
export class TasksService {
  private readonly mapper = new ReadTasksMapper();
  constructor(private readonly prisma: PrismaService){

  }
  async getMany(query: ReadManyTasksQueryDTO): Promise<ReadManyTasksDTO> {
    const boardId: Prisma.BoardsWhereInput | undefined = query.search 
  ? { id: query.search } : undefined;

  //const count = await this.prisma.users.count( {where:email})
    const data = await this.prisma.boards.findMany({
      take: query.take,
      skip: query.skip,
      where : boardId,
      include: {
        columns:{
          select:{
            id: true,
            name: true,
            status: true,
          },
          include : {
            tasks : {
              select:{
                id: true,
                name: true,
                description: true,
                priority: true,
                position: true,
                createdAt: true,
                createdById: true,
                columnId: true,
              }
            }
          }
        }
      }
    });

    return this.mapper.mapMany(data);
  }

  async getOne(taskId: string): Promise<ReadTaskDTO> {
    const task = await this.prisma.tasks.findFirst({
      where: {id : taskId}
    })

    if (!task) throw new NotFoundException("task not found");

    return this.mapper.mapOne(task);
  }

  async create(data: CreateTaskDTO): Promise<string> {
    const { id } = await this.prisma.tasks.create( {data: {...data, id: randomUUID()}} );
    return id;
  }

  async update(taskId: string, data:CreateTaskDTO): Promise<void> {
    await this.prisma.tasks.update({ where:{id:taskId}, data});
  }

  async delete(taskId: string): Promise<void> {
    await this.prisma.tasks.delete({ where:{id:taskId}});
  }

}
