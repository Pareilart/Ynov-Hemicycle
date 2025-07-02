export interface IOrganeCirconscription {
  uid: string;
  codeType: string;
  libelle: string;
  libelleEdition: string;
  libelleAbrege: string;
  libelleAbrev: string;
  viMoDe: {
    dateDebut: string;
    dateAgrement?: string;
    dateFin?: string;
  };
  organeParent?: string;
  chambre?: string;
  regime: string;
  legislature: string;
  numero: string;
  lieu: {
    region: {
      type: string;
      libelle: string;
    };
    departement: {
      codeNatureDep: string;
      code: string;
      libelle: string;
    };
  };
}
