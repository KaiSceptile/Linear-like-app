import { ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { contain } from 'supertest/lib/cookies';
import { Prisma } from '@prisma/client';
import { CreateWorkspaceMemberDTO, ReadWorkspaceDTO, ReadWorkspaceMemberDTO } from './dto';
import { CreateWorkspaceDTO } from './dto';
import { ReadManyWorkspacesQueryDTO } from './dto';
import { ReadManyWorkspacesDTO } from './dto';
import { ReadWorkspacesMapper } from './read.workspaces.mapper';

@Injectable()
export class WorkspacesService {
  private readonly mapper = new ReadWorkspacesMapper();
  constructor(private readonly prisma: PrismaService){

  }
  async getMany(query: ReadManyWorkspacesQueryDTO): Promise<ReadManyWorkspacesDTO> {
    
    const id: Prisma.WorkspacesWhereInput | undefined = query.search 
  ? { id: query.search } : undefined;

  //const count = await this.prisma.workspaces.count( {where: id})
    const data = await this.prisma.workspaces.findMany({
      //take: query.take,
      //skip: query.skip,
      where : id,
      include : {
        users: {
          include: {
            user: {
              select: {
                id: true,  
                name: true,
              },
            }
          },
    },
    boards: {
      select: {
        id: true,
        name: true
      }
    }
      }
    });

    

    return this.mapper.mapMany(data)
  }

  async getOne(workspaceId: string): Promise<ReadWorkspaceDTO> {
    const workspace = await this.prisma.workspaces.findFirst({
      where: {id : workspaceId},
      include : {
        users: {
          include: {
            user: {
              select: {
                id: true,  
                name: true,
              },
            }
          },
    }, boards: {
      select: {
        id: true,
        name: true
      }
    }
      }
    })

    if (!workspace) throw new NotFoundException("workspace not found");
     return this.mapper.mapOne(workspace)
  }

  async create(data: CreateWorkspaceDTO): Promise<string> {
    await this.checkName(data.name);

    const { id } = await this.prisma.workspaces.create( {data: {name:data.name, id: randomUUID()}} );
    await this.prisma.workspaceMembers.create( {data: {
      workspaceId:id,
      userId: data.userId,
      role: "OWNER"
    }} );
    return id;
  }

  async update(data:CreateWorkspaceDTO): Promise<void> {
    await this.checkName(data.name, data.userId);
    await this.prisma.workspaces.update({ where:{id:data.userId}, data});
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workspaces.delete({ where:{id:id}});
  }

  async addMember(data: CreateWorkspaceMemberDTO): Promise<void> {
    await this.prisma.workspaceMembers.create( {data: {
      workspaceId: data.workspaceId,
      userId: data.userId,
      role: "MEMBER"
    }} );
  }

  async deleteMember(workspaceId: string, userId: string): Promise<void> {
    await this.prisma.workspaceMembers.delete({ where:{ userId_workspaceId: {userId:userId, workspaceId: workspaceId}}});
  }

  async editMember(data: CreateWorkspaceMemberDTO): Promise<void> {
  await this.prisma.workspaceMembers.update({
    where: {
      userId_workspaceId: {
        userId: data.userId,
        workspaceId: data.workspaceId,
      },
    },
    data: {
      role: data.role, 
    },
  });
}


  private async checkName(name:string, workspaceId?: string):Promise<boolean> {
    const id = workspaceId ? {not: workspaceId} : undefined;
    const existingOne = await this.prisma.workspaces.findFirst({
      where : { name : {equals: name, mode: "insensitive"}, id}
    })

    if (existingOne) throw new ConflictException(`Workspace with name ${name} already exists`)

    return true;
  }
}
