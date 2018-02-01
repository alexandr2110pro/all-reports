import {
  ApiOperation,
  ApiResponse,
  ApiUseTags
} from '@nestjs/swagger';
import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { IAccessToken } from './interfaces/access-token.interface';
import { AccessTokenDto } from './dto/access-token.dto';
import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Post('token')
  @ApiOperation({ title: 'Create an access token (Login User)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The JWT access token object',
    type: AccessTokenDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong password' })
  async createAccessToken(@Body() createAccessTokenDto: CreateAccessTokenDto): Promise<IAccessToken> {
    return await this.authService.createAccessToken(createAccessTokenDto);
  }
}
