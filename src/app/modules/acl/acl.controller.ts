import { Body, Controller, Delete, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiImplicitParam, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AclService } from './acl.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Get } from '@nestjs/common/utils/decorators/request-mapping.decorator';
import { RoleDto } from './dto/role.dto';
import { IRole } from './interfaces/role.interface';
import { FindRolesQueryDto } from './dto/find-roles-query.dto';

@ApiUseTags('acl')
@Controller('acl')
export class AclController {

  constructor(private readonly aclService: AclService) {}

  @Post('roles')
  @ApiOperation({title: 'Create a new role'})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Success'})
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Role already exists'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST})
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    await this.aclService.createRole(createRoleDto);
  }

  @Get('roles')
  @ApiOperation({title: 'find roles'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all roles satisfying the query',
    type: RoleDto,
    isArray: true,
  })
  async findRoles(@Query() filter: FindRolesQueryDto): Promise<IRole[]> {
    return await this.aclService.findRoles(filter);
  }

  @Delete('roles/:id')
  @ApiImplicitParam({name: 'id', required: true})
  @ApiResponse({status: HttpStatus.OK})
  @ApiResponse({status: HttpStatus.NOT_FOUND})
  @ApiResponse({status: HttpStatus.BAD_REQUEST})
  async removeRoleById(@Param() params) {
    await this.aclService.removeById(params.id);
  }
}
