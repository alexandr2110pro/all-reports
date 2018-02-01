import { Component, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ROLE_MODEL_TOKEN } from './acl.constants';
import { Model } from 'mongoose';
import { IRole } from './interfaces/role.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesQueryDto } from './dto/find-roles-query.dto';

@Component()
export class AclService {

  constructor(@Inject(ROLE_MODEL_TOKEN) private readonly roleModel: Model<IRole>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<IRole> {
    const {parentRoleName, roleName} = createRoleDto;
    const roleModelData = {roleName, parent: null};

    const existing = await this.roleModel.findOne({roleName}).exec();
    if (existing) throw new HttpException('Role already exists', HttpStatus.CONFLICT);

    if (parentRoleName) {
      const parentRole = await this.roleModel.findOne({roleName: parentRoleName}).exec();
      if (!parentRole) {
        throw new HttpException(`Can't find parent role ${parentRole}`, HttpStatus.BAD_REQUEST);
      }
      roleModelData.parent = parentRole.id;
    }

    const newRole = new this.roleModel(roleModelData);

    return await newRole.save();
  }

  async findRoles(filter: FindRolesQueryDto): Promise<IRole[]> {
    return await this.roleModel
      .find(filter)
      .select('roleName')
      .populate('parent', 'roleName')
      .exec();
  }

  async removeById(id: String) {
    console.log('REMOVE ROLE', id);

    const children = await this.findRoles({parent: id});

    await Promise.all(children.map(role => this.removeById(role.id)));

    console.log('all children removed');

    await this.roleModel.findByIdAndRemove(id).exec();
  }
}
