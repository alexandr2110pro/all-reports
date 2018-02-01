import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UserDto {

  @ApiModelPropertyOptional()
  readonly firstName: String;

  @ApiModelPropertyOptional()
  readonly lastName: String;

  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly email: String;

}
