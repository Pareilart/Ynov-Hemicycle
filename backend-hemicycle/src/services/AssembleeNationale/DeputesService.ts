import AdmZip from 'adm-zip';
import logger from '../../utils/logger';
import Depute from '../../models/AssembleeNationale/Depute';
import { IActeur } from '../../types/assemblee-nationale/Acteur';
import { DeputeData } from '../../types/assemblee-nationale/Depute';
import { BaseService } from './BaseService';

export class DeputesService extends BaseService {
  protected static readonly DEPUTES_URLS = {
    15: 'https://data.assemblee-nationale.fr/static/openData/repository/15/amo/deputes_actifs_mandats_actifs_organes/AMO10_deputes_actifs_mandats_actifs_organes_XV.json.zip',
    16: 'https://data.assemblee-nationale.fr/static/openData/repository/16/amo/deputes_actifs_mandats_actifs_organes/AMO10_deputes_actifs_mandats_actifs_organes.json.zip',
    17: 'https://data.assemblee-nationale.fr/static/openData/repository/17/amo/deputes_actifs_mandats_actifs_organes/AMO10_deputes_actifs_mandats_actifs_organes.json.zip',
  };

  public static async updateDeputes(legislature: 15 | 16 | 17 = 17): Promise<void> {
    try {
      logger.info(`Début de la mise à jour des députés de la législature ${legislature}`);

      if (!this.DEPUTES_URLS[legislature]) {
        throw new Error(`Législature ${legislature} non supportée`);
      }

      const zipBuffer = await this.retryableRequest(this.DEPUTES_URLS[legislature]);
      logger.info(`Fichier zip de la législature ${legislature} téléchargé avec succès`);

      const zip = new AdmZip(zipBuffer);
      const entries = zip.getEntries();

      const updatePromises = entries
        .filter((entry) => entry.entryName.startsWith('json/acteur/') && entry.entryName.endsWith('.json'))
        .map(async (entry) => {
          const fileContent = entry.getData().toString('utf8');
          const deputeData = JSON.parse(fileContent);

          if (deputeData.acteur) {
            const transformedData = this.transformDeputeData(deputeData.acteur);
            if (transformedData) {
              await Depute.findOneAndUpdate(
                { uid: transformedData.uid },
                transformedData,
                { upsert: true, new: true },
              );
              logger.info(`Député ${transformedData.uid} mis à jour avec succès`);
            }
          }
        });

      await Promise.all(updatePromises);

      logger.info(`Mise à jour des députés de la législature ${legislature} terminée avec succès`);
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour des députés de la législature ${legislature}:`, error);
      throw error;
    }
  }

  private static transformDeputeData(data: IActeur): DeputeData {
    const adresses = data.adresses?.adresse?.map((adresse) => ({
      typeLibelle: this.handleXmlNullValue(adresse.typeLibelle),
      numeroRue: this.handleXmlNullValue(adresse.numeroRue),
      nomRue: this.handleXmlNullValue(adresse.nomRue),
      codePostal: this.handleXmlNullValue(adresse.codePostal),
      ville: this.handleXmlNullValue(adresse.ville),
      valeurElectronique: this.handleXmlNullValue(adresse.valElec),
    })) || [];

    const transformedMandats = data.mandats?.mandat?.map((mandat) => ({
      uid: mandat.uid,
      typeOrgane: mandat.typeOrgane,
      dateDebut: new Date(mandat.dateDebut),
      dateFin: mandat.dateFin ? new Date(mandat.dateFin) : null,
      preseance: parseInt(mandat.preseance, this.getRadix()),
      nominPrincipale: mandat.nominPrincipale === '1',
      infosQualite: {
        codeQualite: mandat.infosQualite?.codeQualite || '',
        libQualite: mandat.infosQualite?.libQualite || '',
        libQualiteSex: mandat.infosQualite?.libQualiteSex || '',
      },
      organeRef: Array.isArray(mandat.organes.organeRef)
        ? mandat.organes.organeRef
        : [mandat.organes.organeRef],
      miseAJourAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return {
      uid: (data.uid as any)?.['#text'] || data.uid,
      civilite: data.etatCivil.ident.civ,
      nom: data.etatCivil.ident.nom,
      prenom: data.etatCivil.ident.prenom,
      trigramme: this.handleXmlNullValue(data.etatCivil.ident.trigramme) || undefined,
      dateNaissance: new Date(data.etatCivil.infoNaissance.dateNais),
      lieuNaissance: {
        ville: this.handleXmlNullValue(data.etatCivil.infoNaissance.villeNais),
        departement: this.handleXmlNullValue(data.etatCivil.infoNaissance.depNais),
        pays: this.handleXmlNullValue(data.etatCivil.infoNaissance.paysNais),
      },
      profession: this.handleXmlNullValue(data.profession?.libelleCourant) || undefined,
      uri_hatvp: this.handleXmlNullValue(data.uri_hatvp) || undefined,
      adresses,
      mandats: transformedMandats || [],
      miseAJourAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export default new DeputesService();
