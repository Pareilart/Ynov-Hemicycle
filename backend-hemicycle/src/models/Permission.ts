import mongoose, { Schema } from 'mongoose';
import { IPermission } from '../types';

const permissionSchema = new Schema<IPermission>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPermission>('Permission', permissionSchema, 'permissions');
