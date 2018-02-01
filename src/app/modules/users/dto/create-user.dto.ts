import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {

  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly password: String;

  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly confirmPassword: String;
}
