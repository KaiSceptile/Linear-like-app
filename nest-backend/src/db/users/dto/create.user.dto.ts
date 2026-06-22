import { IsDate, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @Length(9, 100)
  email: string;

  @Length(2, 100)
  name: string;

  @Length(8, 100)
  password: string;

  @Length(8, 256)
  hashedRefreshToken: string | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
