import { pick } from 'lodash';
import * as jwt from 'jsonwebtoken';
import { Component, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWT_SECRET } from './auth.constants';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { IAccessToken } from './interfaces/access-token.interface';
import { HttpException } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Component()
export class AuthService {

  constructor(private readonly usersService: UsersService) {}

  async createAccessToken(createAccessTokenTdo: CreateAccessTokenDto): Promise<IAccessToken> {

    const users = await this.usersService.findAll({
      email: createAccessTokenTdo.email
    }, true);

    if (!users.length) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const user = users[0];
    const credentialsAreValid = await user.validateCredentials(createAccessTokenTdo.password);

    if (!credentialsAreValid) throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);

    const expiresIn = 60 * 60;
    const userInfo = pick(user, ['email', 'id']);

    const accessToken = jwt.sign(userInfo, JWT_SECRET, {expiresIn});

    return {
      expiresIn,
      accessToken,
    };
  }

  async verifyUser(jwtPayload: IJwtPayload): Promise<Boolean> {
    return await !!this.usersService.findById(jwtPayload.id);
  }
}
