import { ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { ReadAllBoardsDTO } from './dto/read-all.boards.dto';
import { ReadBoardDTO } from './dto/read.board.dto';
import { CreateBoardDTO } from './dto/create.board.dto';

@Injectable()
export class BoardsService {
  //private readonly mapper = new ReadWorkspacesMapper();
  constructor(private readonly prisma: PrismaService){

  }
  async getMany(workspaceId:string): Promise<ReadAllBoardsDTO> {
    const boards = await this.prisma.boards.findMany({
      //take: query.take,
      //skip: query.skip,
      where : {workspaceId : workspaceId},
      });

    return {data:boards};
  }

  async getOne(boardId: string): Promise<ReadBoardDTO> {
    const board = await this.prisma.boards.findFirst({
      where: {id : boardId},
    })

    if (!board) throw new NotFoundException("board not found");
     return board;
  }

  async create(data: CreateBoardDTO): Promise<string> {
    await this.checkName(data.name);

    const { id } = await this.prisma.boards.create( {data: {...data, id: randomUUID()}} );

    await this.prisma.columns.create(
      {
        data: {
        id: randomUUID(),
        name: "To Do",
        status: 0,
        boardId: id
        }
      })

    await this.prisma.columns.create(
      {
        data: {
        id: randomUUID(),
        name: "In progress",
        status: 1,
        boardId: id
        }
      })
    
    await this.prisma.columns.create(
      {
        data: {
        id: randomUUID(),
        name: "Done",
        status: 2,
        boardId: id
        }
      })
    
    return id;
  }

  async update(id: string, data:CreateBoardDTO): Promise<void> {
    await this.checkName(data.name, id);
    await this.prisma.boards.update({ where:{id: id}, data});
  }

  async delete(id: string): Promise<void> {
    await this.prisma.boards.delete({ where:{id:id}});
  }


  private async checkName(name:string, boardId?: string):Promise<boolean> {
    const id = boardId ? {not: boardId} : undefined;
    const existingOne = await this.prisma.boards.findFirst({
      where : { name : {equals: name, mode: "insensitive"}, id}
    })

    if (existingOne) throw new ConflictException(`Board with name ${name} already exists`)

    return true;
  }
}
