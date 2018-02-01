import { RoleSchema } from './schemas/role.schema';
import { DATABASE_CONNECTION_TOKEN } from '../database/database.constants';
import { ROLE_MODEL_TOKEN } from './acl.constants';


export const aclProviders = [
  {
    provide: ROLE_MODEL_TOKEN,
    useFactory: (mongoose) => mongoose.connection.model('Role', RoleSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
