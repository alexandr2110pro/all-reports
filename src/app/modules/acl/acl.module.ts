import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AclService } from './acl.service';
import { AclController } from './acl.controller';
import { aclProviders } from './acl.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AclController],
  components: [
    AclService,
    ...aclProviders,
  ]
})
export class AclModule {}
