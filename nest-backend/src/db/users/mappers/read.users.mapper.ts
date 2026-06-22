import { Users } from "@prisma/client";
import { ReadManyUsersDTO, ReadUserDTO } from "../dto";

export class ReadUsersMapper {
  public mapOne(user: Users): ReadUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      hashedRefreshToken: user.hashedRefreshToken,
      createdAt: user.createdAt
    }
  }

  public mapMany(count: number, users:Users[]): ReadManyUsersDTO {
    return {
      count,
      data: users.map((one)=>this.mapOne(one))
    }
  }
}