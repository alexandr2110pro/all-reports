import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class GetUserDto extends UserDto {

  @ApiModelProperty()
  readonly _id: String;

}
