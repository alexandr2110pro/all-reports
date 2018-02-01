import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class FindUsersQueryDto {

  @ApiModelPropertyOptional()
  readonly firstName?: String;

  @ApiModelPropertyOptional()
  readonly lastName?: String;

  @ApiModelPropertyOptional()
  readonly email?: String;

}
