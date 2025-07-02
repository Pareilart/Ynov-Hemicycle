import { Document } from 'mongoose';

export type DeputeData = {
  uid: string;
  civilite: string;
  nom: string;
  prenom: string;
  trigramme?: string;
  dateNaissance: Date;
  lieuNaissance: {
    ville: string | null;
    departement: string | null;
    pays: string | null;
  };
  profession?: string;
  uri_hatvp?: string;
  adresses: Array<{
    typeLibelle: string | null;
    numeroRue: string | null;
    nomRue: string | null;
    codePostal: string | null;
    ville: string | null;
    valeurElectronique: string | null;
  }>;
  mandats: Array<{
    uid: string;
    typeOrgane: string;
    dateDebut: Date;
    dateFin: Date | null;
    preseance: number;
    nominPrincipale: boolean;
    infosQualite: {
      codeQualite: string;
      libQualite: string;
      libQualiteSex: string;
    };
    organeRef: string | string[];
  }>;
  miseAJourAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface IDepute extends Document, DeputeData {}
