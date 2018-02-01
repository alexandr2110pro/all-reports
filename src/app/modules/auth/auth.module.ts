import * as passport from 'passport';
import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/auth/authorized', method: RequestMethod.ALL });
  }
}
