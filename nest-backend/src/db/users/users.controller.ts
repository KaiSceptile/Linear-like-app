import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDTO,
  ReadUserDTO,
  GetUserParams,
  ReadManyUsersDTO,
  ReadManyUsersQueryDTO,
} from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getMany(@Query() query: ReadManyUsersQueryDTO): Promise<ReadManyUsersDTO> {
    return this.service.getMany(query);
  }

  @Get('userId')
  getOne(@Param() { userId }: GetUserParams): Promise<ReadUserDTO> {
    return this.service.getOne(userId);
  }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<ReadUserDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put()
  async update(
    @Param() { userId }: GetUserParams,
    @Body() data: CreateUserDTO,
  ): Promise<ReadUserDTO> {
    await this.service.update(userId, data);
    return this.service.getOne(userId);
      }

  @Delete('userId')
  delete(@Param() { userId }: GetUserParams): Promise<void> {
    return this.service.delete(userId);
  }
}
