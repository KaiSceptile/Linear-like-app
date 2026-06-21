import { IsDate, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @Length(9, 100)
  email: string;

  @Length(9, 100)
  name: string;

  @Length(9, 100)
  password: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
