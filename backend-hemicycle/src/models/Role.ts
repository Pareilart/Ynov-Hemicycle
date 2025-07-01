import mongoose, { Schema } from 'mongoose';
import { IRole } from '../types';

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission',
  }],
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IRole>('Role', roleSchema, 'roles');
