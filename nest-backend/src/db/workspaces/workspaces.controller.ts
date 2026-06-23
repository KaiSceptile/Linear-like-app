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
  GetWorkspaceParams,
} from './dto';
import { ReadWorkspaceDTO } from './dto';
import { ReadManyWorkspacesQueryDTO } from './dto';
import { ReadManyWorkspacesDTO } from './dto';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDTO } from './dto';

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

  @Put()
  async update(
    @Param() { workspaceId }: GetWorkspaceParams,
    @Body() data: CreateWorkspaceDTO,
  ): Promise<ReadWorkspaceDTO> {
    await this.service.update(data);
    return this.service.getOne(workspaceId);
      }

  @Delete('workspaceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { workspaceId }: GetWorkspaceParams): Promise<void> {
    return this.service.delete(workspaceId);
  }
}
