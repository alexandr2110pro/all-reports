import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto {
  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly email: String;

  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly password: String;
}
