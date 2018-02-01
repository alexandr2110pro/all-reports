import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { JWT_SECRET } from '../auth.constants';
import { HttpException } from '@nestjs/common';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: JWT_SECRET,
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );

    passport.use(this);
  }

  public async verify(req, payload: IJwtPayload, done) {
    const isValid = await this.authService.verifyUser(payload);

    if (!isValid) {
      return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED), false);
    }

    done(null, payload);
  }
}
