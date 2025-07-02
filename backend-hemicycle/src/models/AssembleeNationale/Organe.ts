import mongoose, { Document, Schema } from 'mongoose';

interface IPersonnalite {
  fonction: string;
  nom: string;
  prenom: string;
  telephone?: string;
  mail?: string;
}

interface ISecretariat {
  numeroPieceSecretariat?: string;
  telephonePieceSecretariat?: string;
  personnalites?: IPersonnalite[];
}

export interface IOrgane extends Document {
  uid: string;
  codeType: string;
  libelleType: string;
  libelleAbrege?: string;
  libelle: string;
  dateDebut: Date;
  dateFin?: Date;
  regime: string;
  legislature: number;
  secretariat?: ISecretariat;
  miseAJourAt: Date;
}

const personnaliteSchema = new Schema<IPersonnalite>({
  fonction: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: String,
  mail: String,
});

const secretariatSchema = new Schema<ISecretariat>({
  numeroPieceSecretariat: String,
  telephonePieceSecretariat: String,
  personnalites: [personnaliteSchema],
});

const organeSchema = new Schema<IOrgane>({
  uid: { type: String, required: true, unique: true },
  codeType: { type: String, required: true },
  libelleType: { type: String, required: true },
  libelleAbrege: String,
  libelle: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: Date,
  regime: { type: String, required: true },
  legislature: { type: Number, required: true },
  secretariat: secretariatSchema,
  miseAJourAt: { type: Date, required: true },
});

organeSchema.index({ uid: 1 });
organeSchema.index({ codeType: 1 });
organeSchema.index({ legislature: 1 });

const Organe = mongoose.model<IOrgane>('Organe', organeSchema);

export default Organe;
