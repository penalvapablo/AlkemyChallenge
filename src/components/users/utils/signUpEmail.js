import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function signUpEmail(email) {
  try {
    const message = {
      to: `${email}`,
      from: 'penalva.estudio@gmail.com',
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
