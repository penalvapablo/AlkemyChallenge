import sgMail from '@sendgrid/mail';
import config from '../../../config/index.js';

console.log(config.SENDGRID_API_KEY)
console.log(config.SENDGRID_EMAIL)

sgMail.setApiKey(config.SENDGRID_API_KEY);
export default async function signUpEmail(email) {
  try {
    const message = {
      to: `${email}`,
      from: `${config.SENDGRID_EMAIL}`,
      subject: 'Bienvenido a Disney',
      text: 'bienvenido',
      html: '<h1>Bienvenido</h1>',
    };

    let response = await sgMail.send(message);

    console.log(response);
  } catch (error) {
    console.log(`Error al enviar mail de registro. ${error}`);
  }
}
