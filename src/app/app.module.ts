import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AclModule } from './modules/acl/acl.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CoreModule,
    AclModule,
  ],
})
export class ApplicationModule {}
