import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, ReadUserDTO } from 'src/db/users/dto';
import { UsersService } from 'src/db/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data:CreateUserDTO){
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const userId = await this.usersService.create({...data, password: passwordHash});
    const tokens = await this.getTokens(userId, data.email);
    await this.updateRtHash(userId, tokens.refresh_token);

    return tokens;
  }

  async login( {email, password} ) {
    console.log(email);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const tokens = await this.getTokens(user.id, email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const jwtPayload = { sub: userId, email };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACCESS_SECRET || 'at-secret',
        expiresIn: '60m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET || 'rt-secret',
        expiresIn: '7d',
      }),
    ]);

    return { access_token: at, refresh_token: rt, success: true };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    await this.usersService.updateTokenHash(
      userId,
      hash,
    );
  }

  async logout(userId: string) {
    await this.usersService.updateTokenHash(
      userId,
      null,
    );
    return { success: true };
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.getOne(userId);
    
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await bcrypt.compare(rt, user.hashedRefreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}