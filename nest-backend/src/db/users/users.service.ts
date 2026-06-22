import { ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDTO, ReadManyUsersDTO, ReadManyUsersQueryDTO, ReadUserDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { contain } from 'supertest/lib/cookies';
import { Prisma } from '@prisma/client';
import { ReadUsersMapper } from './mappers/read.users.mapper';

@Injectable()
export class UsersService {
  private readonly mapper = new ReadUsersMapper();
  constructor(private readonly prisma: PrismaService){

  }
  async getMany(query: ReadManyUsersQueryDTO): Promise<ReadManyUsersDTO> {
    const email: Prisma.UsersWhereInput | undefined = query.search 
  ? { email: { contains: query.search, mode: "insensitive" } } : undefined;

  const count = await this.prisma.users.count( {where:email})
    const data = await this.prisma.users.findMany({
      take: query.take,
      skip: query.skip,
      where : email
    });

    return this.mapper.mapMany(count,data);
  }

  async getOne(userId: string): Promise<ReadUserDTO> {
    const user = await this.prisma.users.findFirst({
      where: {id : userId}
    })

    if (!user) throw new NotFoundException("user not found");

    return this.mapper.mapOne(user);
  }

  async create(data: CreateUserDTO): Promise<string> {
    await this.checkEmail(data.email);

    const { id } = await this.prisma.users.create( {data: {...data, id: randomUUID()}} );
    return id;
  }

  async update(userId: string, data:CreateUserDTO): Promise<void> {
    await this.checkEmail(data.email, userId);

    await this.prisma.users.update({ where:{id:userId}, data});
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.users.delete({ where:{id:userId}});
  }

  private async checkEmail(email:string, userId?: string):Promise<boolean> {
    const id = userId ? {not: userId} : undefined;
    const existingOne = await this.prisma.users.findFirst({
      where : { email : {equals: email, mode: "insensitive"}, id}
    })

    if (existingOne) throw new ConflictException(`User with email ${email} already exists`)

    return true;
  }

  async findByEmail(email: string) {
    return this.prisma.users.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' }
      }
    });
  }

  async updateTokenHash(userId: string, token:string | null): Promise<void> {
    const data= await this.getOne(userId);
    data.hashedRefreshToken = token;
    await this.prisma.users.update({ where:{id:userId}, data});
  }
}
