import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { Query } from '@nestjs/common/utils/decorators/route-params.decorator';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


  @Get()
  @ApiOperation({title: 'Get all users matching query'})
  @ApiResponse({
    description: 'An array of users',
    status: 200,
    type: GetUserDto,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.'})
  async findAll(@Query() filter: FindUsersQueryDto): Promise<IUser[]> {
    return await this.usersService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({title: 'Find a user by id'})
  @ApiBearerAuth()
  @ApiImplicitParam({
    name: 'id',
    description: 'user id',
    required: true,
  })
  @ApiResponse({
    description: 'A user',
    status: HttpStatus.OK,
    type: GetUserDto,
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.'})
  async findById(@Param() params): Promise<IUser> {
    return await this.usersService.findById(params.id);
  }


  @Post()
  @ApiOperation({title: 'Create a new User'})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'confirm password doesn\'t match the password, or the payload is invalid',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already in use',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.'})
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }
}
