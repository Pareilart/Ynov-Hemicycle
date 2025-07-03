import * as LawPostService from '../../services/LawPostService';
import * as SecurityCodeService from '../../services/SecurityCodeService';
import * as userService from '../../services/userService';
import * as EmailService from '../../services/EmailService';

describe('Services métier - Tests unitaires', () => {
    describe('LawPostService', () => {
        test('devrait exister', () => {
            expect(LawPostService).toBeDefined();
        });
    });

    describe('SecurityCodeService', () => {
        test('devrait exister', () => {
            expect(SecurityCodeService).toBeDefined();
        });
    });

    describe('userService', () => {
        test('devrait exister', () => {
            expect(userService).toBeDefined();
        });
    });
    describe('EmailService', () => {
        test('devrait exister', () => {
            expect(EmailService).toBeDefined();
        });
    });

    // Tests supplémentaires pour les services métier

    describe('LawPostService.incrementReevaluation', () => {
    test('devrait lancer une erreur si la publication est introuvable', async () => {
        const LawPost = require('../../models/LawPost').default;
        const spy = jest.spyOn(LawPost, 'findById').mockResolvedValue(null);
        await expect(LawPostService.LawPostService.incrementReevaluation('507f1f77bcf86cd799439011'))
            .rejects.toThrow('Publication non trouvée');
        spy.mockRestore();
    });
        test('devrait lancer une erreur si l\'ID est invalide', async () => {
            await expect(LawPostService.LawPostService.incrementReevaluation('id_invalide'))
                .rejects.toThrow('ID de publication invalide');
        });
    });

    describe('SecurityCodeService', () => {
        test('MAX_ATTEMPTS doit être défini à 5', () => {
            expect((SecurityCodeService as any).SecurityCodeService.MAX_ATTEMPTS).toBe(5);
        });
    });

    describe('UserService', () => {
    test('doit lancer une erreur si l\'email existe déjà', async () => {
        const User = require('../../models/User').default;
        const spy = jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@test.com' });
        await expect((userService as any).UserService.createUser({ email: 'test@test.com', password: 'test', firstname: 'a', lastname: 'b', role: 'USER' }))
            .rejects.toThrow("Erreur lors de la création de l'utilisateur: Cet email est déjà utilisé");
        spy.mockRestore();
    });

    test('doit lancer une erreur si le format de l\'email est invalide', async () => {
        await expect((userService as any).UserService.createUser({ email: 'invalid', password: 'test', firstname: 'a', lastname: 'b', role: 'USER' }))
            .rejects.toThrow('Format d\'email invalide');
    });
        test('doit lancer une erreur si email manquant lors de la création', async () => {
            await expect((userService as any).UserService.createUser({ password: 'test', firstname: 'a', lastname: 'b', role: 'USER' }))
                .rejects.toThrow('Tous les champs sont requis');
        });
    });

    describe('EmailService', () => {
        test('doit lancer une erreur générique si MAILTRAP_SANDBOX_API_TOKEN est manquant', async () => {
            const old = process.env.MAILTRAP_SANDBOX_API_TOKEN;
            delete process.env.MAILTRAP_SANDBOX_API_TOKEN;
            await expect((EmailService as any).sendEmailSandbox({ to: 'test@test.com', subject: 's', text: 't' }))
                .rejects.toThrow("Échec de l'envoi de l'email sandbox. Veuillez vérifier la configuration de Mailtrap et réessayer.");
            process.env.MAILTRAP_SANDBOX_API_TOKEN = old;
        });
    });
});
