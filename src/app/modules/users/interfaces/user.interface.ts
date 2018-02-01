import { Document } from 'mongoose';

export interface IUser extends Document {

  readonly firstName: String,

  readonly lastName: String,

  readonly email: String,

  validateCredentials(password: String): Promise<Boolean>

}
