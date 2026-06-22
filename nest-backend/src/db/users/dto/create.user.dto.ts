import { IsDate, IsOptional, Length } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class CreateUserDTO {
  @Length(9, 100)
  email: string;

  @Length(2, 100)
  name: string;

  @Length(8, 100)
  password: string;

  @IsOptional()
  @Exclude()
  hashedRefreshToken: string | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
