import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RoleDto {

  @ApiModelProperty()
  readonly roleName: String;

  @ApiModelPropertyOptional()
  readonly parentRole?: String;
}
