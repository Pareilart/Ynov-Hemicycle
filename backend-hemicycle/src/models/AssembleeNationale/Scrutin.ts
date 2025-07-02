import mongoose, { Schema, Document } from 'mongoose';

export interface IScrutin extends Document {
  uid: string;
  numero: string;
  organeRef: string;
  legislature: string;
  sessionRef: string;
  seanceRef: string;
  dateScrutin: Date;
  quantiemeJourSeance: string;
  typeVote: {
    codeTypeVote: string;
    libelleTypeVote: string;
    typeMajorite: string;
  };
  sort: {
    code: string;
    libelle: string;
  };
  titre: string;
  demandeur: {
    texte: string;
    referenceLegislative: string | null;
  };
  objet: {
    libelle: string;
    dossierLegislatif: string | null;
    referenceLegislative: string | null;
  };
  modePublicationDesVotes: string;
  syntheseVote: {
    nombreVotants: number;
    suffragesExprimes: number;
    nbrSuffragesRequis: number;
    annonce: string;
    decompte: {
      nonVotants: number;
      pour: number;
      contre: number;
      abstentions: number;
      nonVotantsVolontaires: number;
    };
  };
  ventilationVotes: {
    organeRef: string;
    groupes: {
      organeRef: string;
      nombreMembresGroupe: number;
      vote: {
        positionMajoritaire: string;
        decompteVoix: {
          nonVotants: number;
          pour: number;
          contre: number;
          abstentions: number;
          nonVotantsVolontaires: number;
        };
      };
    }[];
  };
  miseAJourAt: Date;
}

const scrutinSchema = new Schema<IScrutin>({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  numero: {
    type: String,
    required: true,
  },
  organeRef: {
    type: String,
    required: true,
  },
  legislature: {
    type: String,
    required: true,
  },
  sessionRef: {
    type: String,
    required: true,
  },
  seanceRef: {
    type: String,
    required: true,
  },
  dateScrutin: {
    type: Date,
    required: true,
  },
  quantiemeJourSeance: {
    type: String,
    required: true,
  },
  typeVote: {
    codeTypeVote: {
      type: String,
      required: true,
    },
    libelleTypeVote: {
      type: String,
      required: true,
    },
    typeMajorite: {
      type: String,
      required: true,
    },
  },
  sort: {
    code: {
      type: String,
      required: true,
    },
    libelle: {
      type: String,
      required: true,
    },
  },
  titre: {
    type: String,
    required: true,
  },
  demandeur: {
    texte: {
      type: String,
      required: true,
    },
    referenceLegislative: {
      type: String,
      required: false,
    },
  },
  objet: {
    libelle: {
      type: String,
      required: true,
    },
    dossierLegislatif: {
      type: String,
      required: false,
    },
    referenceLegislative: {
      type: String,
      required: false,
    },
  },
  modePublicationDesVotes: {
    type: String,
    required: true,
  },
  syntheseVote: {
    nombreVotants: {
      type: Number,
      required: true,
    },
    suffragesExprimes: {
      type: Number,
      required: true,
    },
    nbrSuffragesRequis: {
      type: Number,
      required: true,
    },
    annonce: {
      type: String,
      required: true,
    },
    decompte: {
      nonVotants: {
        type: Number,
        required: true,
      },
      pour: {
        type: Number,
        required: true,
      },
      contre: {
        type: Number,
        required: true,
      },
      abstentions: {
        type: Number,
        required: true,
      },
      nonVotantsVolontaires: {
        type: Number,
        required: true,
      },
    },
  },
  ventilationVotes: {
    organeRef: {
      type: String,
      required: true,
    },
    groupes: [{
      organeRef: {
        type: String,
        required: true,
      },
      nombreMembresGroupe: {
        type: Number,
        required: true,
      },
      vote: {
        positionMajoritaire: {
          type: String,
          required: true,
        },
        decompteVoix: {
          nonVotants: {
            type: Number,
            required: true,
          },
          pour: {
            type: Number,
            required: true,
          },
          contre: {
            type: Number,
            required: true,
          },
          abstentions: {
            type: Number,
            required: true,
          },
          nonVotantsVolontaires: {
            type: Number,
            required: true,
          },
        },
      },
    }],
  },
  miseAJourAt: {
    type: Date,
    default: Date.now,
  },
});

const Scrutin = mongoose.model<IScrutin>('Scrutin', scrutinSchema);

export default Scrutin;
