import { Document } from 'mongoose';

export interface IRole extends Document {
  readonly id: String;
  readonly roleName: String;
  readonly parent?: String;
}
