import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class FindRolesQueryDto {

  @ApiModelPropertyOptional()
  readonly roleName?: String;

  @ApiModelPropertyOptional()
  readonly id?: String;

  @ApiModelPropertyOptional()
  readonly parent?: String;
}
