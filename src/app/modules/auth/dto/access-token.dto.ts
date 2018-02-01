import { ApiModelProperty } from '@nestjs/swagger';

export class AccessTokenDto {

  @ApiModelProperty()
  readonly accessToken: String;

  @ApiModelProperty()
  readonly expiresIn: Number;

}
