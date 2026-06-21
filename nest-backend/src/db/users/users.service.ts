import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDTO, ReadManyUsersDTO, ReadManyUsersQueryDTO, ReadUserDTO } from './dto';

@Injectable({})
export class UsersService {
  getMany(query: ReadManyUsersQueryDTO): Promise<ReadManyUsersDTO> {
    throw new NotImplementedException(
          `method not implemented ${JSON.stringify(query)}`,
        );
  }

  getOne(userId: string): Promise<ReadUserDTO> {
    throw new NotImplementedException(`method not implemented ${userId}`);
  }

  create(data: CreateUserDTO): Promise<string> {
    throw new NotImplementedException(`method not implemented ${JSON.stringify(data)}`);
  }

  update(userId: string, data:CreateUserDTO): Promise<void> {
    console.log(data);
    throw new NotImplementedException(`method not implemented ${userId}`);
  }

  delete(userId: string): Promise<void> {
    throw new NotImplementedException(`method not implemented ${userId}`);
  }
}
