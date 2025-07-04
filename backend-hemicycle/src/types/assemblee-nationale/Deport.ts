export interface IDeport {
  uid: string;
  chronotag: string;
  legislature: string;
  refActeur: string;
  dateCreation: string;
  datePublication: string;
  portee: {
    code: string;
    libelle: string;
  };
  lecture: {
    code: string;
    libelle: string;
  };
  instance: {
    code: string;
    libelle: string;
  };
  cible: {
    type: {
      code: string;
      libelle: string;
    };
    referenceTextuelle: string;
    references?: any;
  };
  explication: string;
}
