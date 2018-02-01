import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {

  @ApiModelProperty({type: String, required: true})
  readonly roleName: String;

  @ApiModelPropertyOptional()
  readonly parentRoleName?: String;
}
