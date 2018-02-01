import { COMMON_SCHEMA_OPTIONS } from '../../database/database.constants';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
}, COMMON_SCHEMA_OPTIONS);


RoleSchema.pre('remove', async function (next) {
  console.log('pre', this._id, this.id);
  next();
  // await this.constructor.remove({parent: this._id})
});

export { RoleSchema };
