interface SecurityCodeTemplateProps {
  firstname: string;
  lastname: string;
  security_code: string;
  company_info_name?: string;
  company_info_address?: string;
  company_info_city?: string;
  company_info_zip_code?: string;
  company_info_country?: string;
}

export const generateSecurityCodeTemplate = (props: SecurityCodeTemplateProps): { html: string; text: string } => {
  const {
    firstname,
    lastname,
    security_code,
    company_info_name = 'Hemicycle',
    company_info_address = '123 Rue de la Paix, 75000 Paris, France',
    company_info_city = 'Paris',
    company_info_zip_code = '75000',
    company_info_country = 'France'
  } = props;

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Code de vérification - ${company_info_name}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .security-code {
          background-color: #3498db;
          color: white;
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
          letter-spacing: 5px;
          font-family: 'Courier New', monospace;
        }
        .instructions {
          color: #7f8c8d;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ecf0f1;
          color: #95a5a6;
          font-size: 12px;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${company_info_name}</div>
        </div>
        
        <div class="greeting">
          Bonjour, ${firstname} ${lastname} !
        </div>
        
        <div class="instructions">
          Voici votre code de vérification :
        </div>
        
        <div class="security-code">
          ${security_code}
        </div>
        
        <div class="warning">
          ⚠️ Ce code est valide pendant 5 minutes. Ne le partagez avec personne.
        </div>
        
        <div class="instructions">
          Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email.
        </div>
        
        <div class="footer">
          <p><strong>${company_info_name}</strong></p>
          <p>${company_info_address}</p>
          <p>${company_info_city}, ${company_info_zip_code}</p>
          <p>${company_info_country}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Bonjour, ${firstname} ${lastname} !

Code de vérification : ${security_code}

Ce code est valide pendant 5 minutes. Ne le partagez avec personne.

Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email.

---
${company_info_name}
${company_info_address}
${company_info_city}, ${company_info_zip_code}
${company_info_country}
  `.trim();

  return { html, text };
};