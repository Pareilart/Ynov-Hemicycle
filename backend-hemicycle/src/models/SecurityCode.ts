import mongoose, { Schema } from 'mongoose';
import { ISecurityCode } from '../types/interfaces/ISecurityCode';

const securityCodeSchema = new Schema<ISecurityCode>({
  code: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
    default: 0,
  },
  expireAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // Le document sera automatiquement supprimé à la date d'expiration
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Index composé pour s'assurer qu'une entité n'a qu'un seul code actif à la fois
securityCodeSchema.index({ entityId: 1, entityType: 1 }, { unique: true });

const SecurityCode = mongoose.model<ISecurityCode>('SecurityCode', securityCodeSchema);

export default SecurityCode;
