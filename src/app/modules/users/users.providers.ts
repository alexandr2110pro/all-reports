import { UserSchema } from './schemas/user.schema';
import { DATABASE_CONNECTION_TOKEN } from '../database/database.constants';
import { USER_MODEL_TOKEN } from './users.constants';


export const usersProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (mongoose) => mongoose.connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
