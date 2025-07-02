export interface ITypeVote {
  codeTypeVote: string;
  libelleTypeVote: string;
  typeMajorite: string;
}

export interface ISort {
  code: string;
  libelle: string;
}

export interface IDemandeur {
  texte: string;
  referenceLegislative: string;
}

export interface IObjet {
  libelle: string;
  dossierLegislatif: string;
  referenceLegislative: string;
}

export interface IDecompteVoix {
  nonVotants: number;
  pour: number;
  contre: number;
  abstentions: number;
  nonVotantsVolontaires: number;
}

export interface ISyntheseVote {
  nombreVotants: number;
  suffragesExprimes: number;
  nbrSuffragesRequis: number;
  annonce: string;
  decompte: IDecompteVoix;
}

export interface IGroupeVote {
  positionMajoritaire: string;
  decompteVoix: IDecompteVoix;
}

export interface IGroupe {
  organeRef: string;
  nombreMembresGroupe: number;
  vote: IGroupeVote;
}

export interface IVentilationVotes {
  organeRef: string;
  groupes: IGroupe[];
}

export interface IScrutin {
  uid: string;
  numero: string;
  organeRef: string;
  legislature: string;
  sessionRef: string;
  seanceRef: string;
  dateScrutin: Date;
  quantiemeJourSeance: string;
  typeVote: ITypeVote;
  sort: ISort;
  titre: string;
  demandeur: IDemandeur;
  objet: IObjet;
  modePublicationDesVotes: string;
  syntheseVote: ISyntheseVote;
  ventilationVotes: IVentilationVotes;
  miseAJourAt: Date;
}
