import mongoose, { Document, Schema } from 'mongoose';

interface ICodeLibelle {
  code: string;
  libelle: string;
}

interface ICibleType extends ICodeLibelle {}

interface ICible {
  type: ICibleType;
  referenceTextuelle: string;
  references?: any;
}

export interface IDeportDocument extends Document {
  uid: string;
  chronotag: string;
  legislature: number;
  refActeur: string;
  dateCreation: Date;
  datePublication: Date;
  portee: ICodeLibelle;
  lecture: ICodeLibelle;
  instance: ICodeLibelle;
  cible: ICible;
  explication: string;
  miseAJourAt: Date;
}

const codeLibelleSchema = new Schema<ICodeLibelle>({
  code: { type: String, required: true },
  libelle: { type: String, required: true },
});

const cibleSchema = new Schema<ICible>({
  type: { type: codeLibelleSchema, required: true },
  referenceTextuelle: { type: String, required: true },
  references: Schema.Types.Mixed,
});

const deportSchema = new Schema<IDeportDocument>({
  uid: { type: String, required: true, unique: true },
  chronotag: { type: String, required: true },
  legislature: { type: Number, required: true },
  refActeur: { type: String, required: true },
  dateCreation: { type: Date, required: true },
  datePublication: { type: Date, required: true },
  portee: { type: codeLibelleSchema, required: true },
  lecture: { type: codeLibelleSchema, required: true },
  instance: { type: codeLibelleSchema, required: true },
  cible: { type: cibleSchema, required: true },
  explication: { type: String, required: true },
  miseAJourAt: { type: Date, required: true },
});

deportSchema.index({ uid: 1 });
deportSchema.index({ refActeur: 1 });
deportSchema.index({ legislature: 1 });
deportSchema.index({ datePublication: 1 });

const Deport = mongoose.model<IDeportDocument>('Deport', deportSchema);

export default Deport;
