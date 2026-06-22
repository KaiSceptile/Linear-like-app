export class ReadUserDTO {
  id: string;

  email: string;

  name: string;

  password: string;

  hashedRefreshToken: string | null;

  createdAt: Date;
}
