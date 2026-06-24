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
  ReadManyTasksQueryDTO,
  ReadManyTasksDTO,
  GetTaskParams,
  ReadTaskDTO,
  CreateTaskDTO,
} from './dto';
import { TasksService } from './tasks.service';

@Controller('users')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getMany(@Query() query: ReadManyTasksQueryDTO): Promise<ReadManyTasksDTO> {
    return this.service.getMany(query);
  }

  @Get(':taskId')
  getOne(@Param() { taskId }: GetTaskParams): Promise<ReadTaskDTO> {
    return this.service.getOne(taskId);
  }

  @Post()
  async create(@Body() data: CreateTaskDTO): Promise<ReadTaskDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put()
  async update(
    @Param() { taskId }: GetTaskParams,
    @Body() data: CreateTaskDTO,
  ): Promise<ReadTaskDTO> {
    await this.service.update(taskId, data);
    return this.service.getOne(taskId);
      }

  @Delete('taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { taskId }: GetTaskParams): Promise<void> {
    return this.service.delete(taskId);
  }
}
