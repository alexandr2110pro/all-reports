import { Model } from 'mongoose';
import { Component, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_MODEL_TOKEN } from './users.constants';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Component()
export class UsersService {


  constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}


  async create(createUserDto: CreateUserDto): Promise<IUser> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException('Passwords doesn\'t match', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.findAll({email: createUserDto.email});
    if (existingUser.length) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(filter: FindUsersQueryDto, includePassword: Boolean = false): Promise<IUser[]> {
    return await this.userModel.find(filter)
      .select(`${includePassword ? '+' : '-'}password`)
      .exec();
  }

  async findById(id: String, includePassword: Boolean = false): Promise<IUser> {
    return await this.userModel.findById(id)
      .select(`${includePassword ? '+' : '-'}password`)
      .exec();

  }

}
