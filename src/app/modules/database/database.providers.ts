import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose-fix';
import { DATABASE_CONNECTION_TOKEN } from './database.constants';

const IS_TEST = process.env.NODE_ENV === 'test';
const MONGODB_URI = process.env.MONGODB_URI_ALL_REPORTS || process.env.MONGODB_URI;
const CONNECTION_OPTIONS = {};

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_TOKEN,
    useFactory: async () => {

      (mongoose as any).Promise = global.Promise;

      if (IS_TEST) {
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.helper.setDbVersion('3.4.3');

        await mockgoose
          .prepareStorage()
          .then(async () => {
            await mongoose.connect('mongodb://user:pass@fake-db.com:19258', CONNECTION_OPTIONS);
          });

      } else {
        await mongoose.connect(MONGODB_URI, CONNECTION_OPTIONS);
      }

      return mongoose;
    },
  },
];

