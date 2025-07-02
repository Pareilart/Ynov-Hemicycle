import * as fs from 'fs';
import AdmZip from 'adm-zip';
import logger from '../../utils/logger';
import Scrutin from '../../models/AssembleeNationale/Scrutin';
import { BaseService } from './BaseService';
import { IScrutin, IDecompteVoix, IGroupe } from '../../types/assemblee-nationale/Scrutin';

export class ScrutinsService extends BaseService {
  protected static readonly SCRUTINS_URLS: Record<number, string> = {
    15: 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/scrutins/Scrutins_XV.json.zip',
    16: 'https://data.assemblee-nationale.fr/static/openData/repository/16/loi/scrutins/Scrutins.json.zip',
    17: 'https://data.assemblee-nationale.fr/static/openData/repository/17/loi/scrutins/Scrutins.json.zip',
  };

  public static async updateScrutins(legislature: 15 | 16 | 17 = 17): Promise<void> {
    try {
      logger.info(`Début de la mise à jour des scrutins de la législature ${legislature}`);

      if (!this.SCRUTINS_URLS[legislature]) {
        throw new Error(`Législature ${legislature} non supportée`);
      }

      const zipBuffer = await this.retryableRequest(this.SCRUTINS_URLS[legislature]);
      logger.info(`Fichier zip de la législature ${legislature} téléchargé avec succès`);

      const zip = new AdmZip(zipBuffer);
      const entries = zip.getEntries();

      const updatePromises = entries
        .filter((entry) => entry.entryName.endsWith('.json') || entry.entryName.endsWith('.xml'))
        .map(async (entry) => {
          const fileContent = entry.getData().toString('utf8');
          if (entry.entryName.endsWith('.json')) {
            const scrutinData = JSON.parse(fileContent);
            if (scrutinData.scrutin) {
              const transformedData = ScrutinsService.transformScrutinData(scrutinData.scrutin);
              await Scrutin.findOneAndUpdate(
                { uid: transformedData.uid },
                transformedData,
                { upsert: true, new: true },
              );
              logger.info(`Scrutin ${transformedData.uid} mis à jour avec succès`);
            }
          } else {
            logger.warn(`Le parsing XML n'est pas encore implémenté pour la législature ${legislature}`);
          }
        });

      await Promise.all(updatePromises);

      logger.info(`Mise à jour des scrutins de la législature ${legislature} terminée avec succès`);
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour des scrutins de la législature ${legislature}:`, error);
      throw error;
    }
  }

  public static async readScrutinFile(filePath: string): Promise<any> {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      logger.error(`Erreur lors de la lecture du fichier ${filePath}:`, error);
      throw error;
    }
  }

  private static transformScrutinData(data: any): IScrutin {
    const radix = this.getRadix();
    const syntheseVote = {
      nombreVotants: parseInt(data.syntheseVote.nombreVotants, radix),
      suffragesExprimes: parseInt(data.syntheseVote.suffragesExprimes, radix),
      nbrSuffragesRequis: parseInt(data.syntheseVote.nbrSuffragesRequis, radix),
      annonce: data.syntheseVote.annonce,
      decompte: {
        nonVotants: parseInt(data.syntheseVote.decompte.nonVotants, radix),
        pour: parseInt(data.syntheseVote.decompte.pour, radix),
        contre: parseInt(data.syntheseVote.decompte.contre, radix),
        abstentions: parseInt(data.syntheseVote.decompte.abstentions, radix),
        nonVotantsVolontaires: parseInt(data.syntheseVote.decompte.nonVotantsVolontaires, radix),
      } as IDecompteVoix,
    };

    const groupes: IGroupe[] = data.ventilationVotes.organe.groupes.groupe.map((groupe: any): IGroupe => ({
      organeRef: groupe.organeRef,
      nombreMembresGroupe: parseInt(groupe.nombreMembresGroupe, radix),
      vote: {
        positionMajoritaire: groupe.vote.positionMajoritaire,
        decompteVoix: {
          nonVotants: parseInt(groupe.vote.decompteVoix.nonVotants, radix),
          pour: parseInt(groupe.vote.decompteVoix.pour, radix),
          contre: parseInt(groupe.vote.decompteVoix.contre, radix),
          abstentions: parseInt(groupe.vote.decompteVoix.abstentions, radix),
          nonVotantsVolontaires: parseInt(groupe.vote.decompteVoix.nonVotantsVolontaires, radix),
        },
      },
    }));

    return {
      uid: data.uid,
      numero: data.numero,
      organeRef: data.organeRef,
      legislature: data.legislature,
      sessionRef: data.sessionRef,
      seanceRef: data.seanceRef,
      dateScrutin: new Date(data.dateScrutin),
      quantiemeJourSeance: data.quantiemeJourSeance,
      typeVote: {
        codeTypeVote: data.typeVote.codeTypeVote,
        libelleTypeVote: data.typeVote.libelleTypeVote,
        typeMajorite: data.typeVote.typeMajorite,
      },
      sort: {
        code: data.sort.code,
        libelle: data.sort.libelle,
      },
      titre: data.titre,
      demandeur: {
        texte: data.demandeur.texte,
        referenceLegislative: data.demandeur.referenceLegislative,
      },
      objet: {
        libelle: data.objet.libelle,
        dossierLegislatif: data.objet.dossierLegislatif,
        referenceLegislative: data.objet.referenceLegislative,
      },
      modePublicationDesVotes: data.modePublicationDesVotes,
      syntheseVote,
      ventilationVotes: {
        organeRef: data.ventilationVotes.organe.organeRef,
        groupes,
      },
      miseAJourAt: new Date(),
    };
  }
}

export default new ScrutinsService();
