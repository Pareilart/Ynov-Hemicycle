export interface IAdresse {
  uid: string;
  type: string;
  typeLibelle: string;
  poids?: string;
  adresseDeRattachement?: string;
  valElec?: string;
  intitule?: string;
  numeroRue?: string;
  nomRue?: string;
  complementAdresse?: string;
  codePostal?: string;
  ville?: string;
}

export interface IMandat {
  uid: string;
  acteurRef: string;
  legislature?: string;
  typeOrgane: string;
  dateDebut: string;
  datePublication?: string;
  dateFin?: string;
  preseance: string;
  nominPrincipale: string;
  infosQualite: {
    codeQualite: string;
    libQualite: string;
    libQualiteSex: string;
  };
  organes: {
    organeRef: string;
  };
  libelle?: string;
  missionSuivanteRef?: string;
  missionPrecedenteRef?: string;
}

export interface IActeur {
  uid: string;
  etatCivil: {
    ident: {
      civ: string;
      prenom: string;
      nom: string;
      alpha: string;
      trigramme: string;
    };
    infoNaissance: {
      dateNais: string;
      villeNais: string;
      depNais: string;
      paysNais: string;
    };
    dateDeces?: {
      '@xsi:nil': string;
    };
  };
  profession?: {
    libelleCourant: string;
    socProcINSEE?: {
      catSocPro: string;
      famSocPro: string;
    };
  };
  uri_hatvp?: string;
  adresses?: {
    adresse: IAdresse[];
  };
  mandats?: {
    mandat: IMandat[];
  };
}
