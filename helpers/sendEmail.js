const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/**
 * Trimite un email prin SendGrid
 * @param {Object} data - {to, subject, html}
 */

const sendEmail = async (data) => {
  const email = { ...data, from: process.env.EMAIL_FROM };
  await sgMail.send(email);
};

module.exports = sendEmail;
