import * as mongoose from 'mongoose';
import { COMMON_SCHEMA_OPTIONS } from '../../database/database.constants';
import { BcryptUtils } from './lib/bcrypt-utils';
import { IUser } from '../interfaces/user.interface';


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  }
}, COMMON_SCHEMA_OPTIONS);


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  try {
    this.password = await BcryptUtils.createPasswordHash(this.password);
    next();
  }
  catch (error) {
    return next(error);
  }
});


UserSchema.methods.validateCredentials = async function (password: String): Promise<Boolean> {
  return await BcryptUtils.validatePassword(password, this.password);
};


export { UserSchema };


let _userModel;
const _createModel = () => _userModel || (_userModel = mongoose.model<IUser>('User', UserSchema));

export const dereferenceModel = () => _userModel = null;

export const clearCollection = () => {
  return _createModel().remove({}).exec()
};

export const loadFixtures = (data) => {
  return _createModel().create(data);
};
