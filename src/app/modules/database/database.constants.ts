import { SchemaOptions } from 'mongoose';

export const DATABASE_CONNECTION_TOKEN = 'DbToken';
export const COMMON_SCHEMA_OPTIONS: SchemaOptions | any = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    versionKey: false,
  }
};
