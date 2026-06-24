import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateWorkspaceMemberDTO,
  GetWorkspaceParams,
  ReadWorkspaceMemberDTO,
} from './dto';
import { ReadWorkspaceDTO } from './dto';
import { ReadManyWorkspacesQueryDTO } from './dto';
import { ReadManyWorkspacesDTO } from './dto';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDTO } from './dto';
import { GetWorkspaceMemberParams } from './dto/get.workspaceMember.params';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly service: WorkspacesService) {}

  @Get()
  getMany(@Query() query: ReadManyWorkspacesQueryDTO): Promise<ReadManyWorkspacesDTO> {
    return this.service.getMany(query);
  }

  @Get(':workspaceId')
  getOne(@Param()  workspaceId: string): Promise<ReadWorkspaceDTO> {
    return this.service.getOne(workspaceId);
  }

  @Post()
  async create(@Body() data: CreateWorkspaceDTO): Promise<ReadWorkspaceDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Post()
  @Put("/member/")
  async createMember(@Body() data: CreateWorkspaceMemberDTO): Promise<ReadWorkspaceDTO> {
    const id = await this.service.addMember(data);
    return this.service.getOne(data.workspaceId);
  }

  @Put()
  async update(
    @Param() { workspaceId }: GetWorkspaceParams,
    @Body() data: CreateWorkspaceDTO,
  ): Promise<ReadWorkspaceDTO> {
    await this.service.update(data);
    return this.service.getOne(workspaceId);
      }

      //поправить декоратор парам
  @Put("/member/")
  async updateMember(
    @Param() { workspaceId }: GetWorkspaceParams,
    @Body() data: CreateWorkspaceMemberDTO,
  ): Promise<ReadWorkspaceDTO> {
    await this.service.editMember(data);
    return this.service.getOne(workspaceId);
      }

  @Delete('workspaceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { workspaceId }: GetWorkspaceParams): Promise<void> {
    return this.service.delete(workspaceId);
  }

  @Delete('/member/')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMember(@Param() { workspaceId, userId }: GetWorkspaceMemberParams): Promise<void> {
    return this.service.deleteMember(workspaceId, userId);
  }
}
