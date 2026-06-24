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
import { BoardsService } from './boards.service';
import { ReadAllBoardsDTO } from './dto/read-all.boards.dto';
import { ReadBoardDTO } from './dto/read.board.dto';
import { CreateBoardDTO } from './dto/create.board.dto';
import { GetBoardParams } from './dto/get.board.params';

@Controller('boards')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Get()
  getMany(@Param()  workspaceId: string): Promise<ReadAllBoardsDTO> {
    return this.service.getMany(workspaceId);
  }

  @Get(':boardId')
  getOne(@Param()  boardId: string): Promise<ReadBoardDTO> {
    return this.service.getOne(boardId);
  }

  @Post()
  async create(@Body() data: CreateBoardDTO): Promise<ReadBoardDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put()
  async update(
    @Param() { boardId }: GetBoardParams,
    @Body() data: CreateBoardDTO,
  ): Promise<ReadBoardDTO> {
    await this.service.update(boardId, data);
    return this.service.getOne(boardId);
      }

  @Delete('workspaceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { boardId }: GetBoardParams): Promise<void> {
    return this.service.delete(boardId);
  }
}
