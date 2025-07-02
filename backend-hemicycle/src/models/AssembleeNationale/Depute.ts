import mongoose, { Schema } from 'mongoose';
import { IDepute } from '../../types/assemblee-nationale/Depute';

const deputeSchema = new Schema<IDepute>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    civilite: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    trigramme: {
      type: String,
      required: false,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    lieuNaissance: {
      ville: String,
      departement: String,
      pays: String,
    },
    profession: {
      type: String,
      required: false,
    },
    uri_hatvp: {
      type: String,
      required: false,
    },
    adresses: [{
      typeLibelle: String,
      numeroRue: String,
      nomRue: String,
      codePostal: String,
      ville: String,
      valeurElectronique: String,
    }],
    mandats: [{
      uid: String,
      typeOrgane: String,
      dateDebut: Date,
      dateFin: Date,
      preseance: Number,
      nominPrincipale: Boolean,
      infosQualite: {
        codeQualite: String,
        libQualite: String,
        libQualiteSex: String,
      },
      organeRef: Schema.Types.Mixed,
    }],
    miseAJourAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IDepute>('Depute', deputeSchema);
