import * as Addresses from '../../models/Addresses';
import * as Depute from '../../models/Depute';
import * as LawPost from '../../models/LawPost';
import * as LawPostReporting from '../../models/LawPostReporting';
import * as LawReaction from '../../models/LawReaction';
import * as Permission from '../../models/Permission';
import * as Role from '../../models/Role';
import * as SecurityCode from '../../models/SecurityCode';
import * as User from '../../models/User';
import * as VotingSurvey from '../../models/VotingSurvey';


// Bloc 1 : Existence des modèles
describe('Modèles Mongoose - Existence', () => {
    test('Addresses devrait exister', () => {
        expect(Addresses).toBeDefined();
    });
    test('Depute devrait exister', () => {
        expect(Depute).toBeDefined();
    });
    test('LawPost devrait exister', () => {
        expect(LawPost).toBeDefined();
    });
    test('LawPostReporting devrait exister', () => {
        expect(LawPostReporting).toBeDefined();
    });
    test('LawReaction devrait exister', () => {
        expect(LawReaction).toBeDefined();
    });
    test('Permission devrait exister', () => {
        expect(Permission).toBeDefined();
    });
    test('Role devrait exister', () => {
        expect(Role).toBeDefined();
    });
    test('SecurityCode devrait exister', () => {
        expect(SecurityCode).toBeDefined();
    });
    test('User devrait exister', () => {
        expect(User).toBeDefined();
    });
    test('VotingSurvey devrait exister', () => {
        expect(VotingSurvey).toBeDefined();
    });
});

// Bloc 2 : Validation par modèle
describe('Addresses - Validation du schéma', () => {
    const AddressesModel = Addresses.default || Addresses;
    const mongoose = require('mongoose');

    test('ne doit pas créer une adresse sans city', async () => {
        const address = new AddressesModel({
            street: '1 rue de Paris',
            postalCode: '75000',
            // city manquant
        });
        let err: any;
        try {
            await address.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.city).toBeDefined();
    });
});

describe('LawPostReporting - Validation du schéma', () => {
    const LawPostReportingModel = LawPostReporting.default || LawPostReporting;
    const mongoose = require('mongoose');

    test('ne doit pas créer un signalement sans lawPost', async () => {
        const report = new LawPostReportingModel({
            reason: 'Spam',
            // lawPost manquant
        });
        let err: any;
        try {
            await report.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        if (err && err.errors && Object.keys(err.errors).length > 0) {
            expect(Object.keys(err.errors).some(key => /law.?post/i.test(key))).toBe(true);
        } else if (err && err.message) {
            expect(err.message).toMatch(/law.?post/i);
        } else {
            throw new Error('Erreur de validation attendue sur lawPost non trouvée');
        }
    });
});

describe('LawReaction - Validation du schéma', () => {
    const LawReactionModel = LawReaction.default || LawReaction;
    const mongoose = require('mongoose');

    test('ne doit pas créer une réaction sans user', async () => {
        const reaction = new LawReactionModel({
            lawPost: new mongoose.Types.ObjectId(),
            // user manquant
        });
        let err: any;
        try {
            await reaction.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        if (err && err.errors && Object.keys(err.errors).length > 0) {
            expect(Object.keys(err.errors).some(key => /user/i.test(key))).toBe(true);
        } else if (err && err.message) {
            expect(err.message).toMatch(/user/);
        } else {
            throw new Error('Erreur de validation attendue sur user non trouvée');
        }
    });
});

describe('Permission - Validation du schéma', () => {
    const PermissionModel = Permission.default || Permission;

    test('ne doit pas créer une permission sans name', async () => {
        const permission = new PermissionModel({});
        let err: any;
        try {
            await permission.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.name).toBeDefined();
    });
});

describe('Role - Validation du schéma', () => {
    const RoleModel = Role.default || Role;

    test('ne doit pas créer un rôle sans name', async () => {
        const role = new RoleModel({});
        let err: any;
        try {
            await role.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.name).toBeDefined();
    });
});

describe('User - Validation du schéma', () => {
    const UserModel = User.default || User;
    const mongoose = require('mongoose');

    test('ne doit pas créer un utilisateur sans email', async () => {
        const user = new UserModel({
            firstname: 'John',
            lastname: 'Doe',
            birthday: new Date('1990-01-01'),
            sexe: 'Homme',
            password: 'Motdepasse1@',
            role: new mongoose.Types.ObjectId(),
        });
        let err: any;
        try {
            await user.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.email).toBeDefined();
    });

    test('doit appliquer la valeur par défaut pour hasOnBoarding', async () => {
        const user = new UserModel({
            firstname: 'Jane',
            lastname: 'Doe',
            birthday: new Date('1990-01-01'),
            sexe: 'Femme',
            email: 'test@example.com',
            password: 'Motdepasse1@',
            role: new mongoose.Types.ObjectId(),
        });
        expect(user.hasOnBoarding).toBe(false); // valeur par défaut
    });
    test('ne doit pas créer un utilisateur avec un email invalide', async () => {
        const user = new UserModel({
            firstname: 'John',
            lastname: 'Doe',
            birthday: new Date('1990-01-01'),
            sexe: 'Homme',
            email: 'not-an-email',
            password: 'Motdepasse1@',
            role: new mongoose.Types.ObjectId(),
        });
        let err: any;
        try {
            await user.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.email).toBeDefined();
    });

    test('ne doit pas créer un utilisateur avec un email déjà existant (unicité)', async () => {
        // Ce test suppose que le champ email est unique dans le schéma User
        // Nécessite une connexion à une base de données MongoDB en mémoire ou mockée
        // Ici, on vérifie juste la présence de l'index unique
        const indexes = UserModel.schema.indexes();
        const hasUniqueEmail = indexes.some(idx =>
            Array.isArray(idx) &&
            idx[0] && idx[0].email === 1 &&
            idx[1] && idx[1].unique === true
        );
        expect(hasUniqueEmail).toBe(true);
    });
});

// Test supplémentaire pour LawPost : champs obligatoires
describe('LawPost - Validation du schéma', () => {
    const LawPostModel = LawPost.default || LawPost;
    const mongoose = require('mongoose');

    test('ne doit pas créer un LawPost sans titre', async () => {
        const post = new LawPostModel({
            // title manquant
            content: 'Contenu de la loi',
            author: new mongoose.Types.ObjectId(),
        });
        let err: any;
        try {
            await post.validate();
        } catch (e: any) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors && err.errors.title).toBeDefined();
    });
});
