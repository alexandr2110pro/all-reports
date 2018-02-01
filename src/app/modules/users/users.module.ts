import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import * as passport from 'passport';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  components: [
    UsersService,
    ...usersProviders,
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {


  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', {session: false}))
      .forRoutes(
        {path: '/users', method: RequestMethod.GET},
      );
  }
}
