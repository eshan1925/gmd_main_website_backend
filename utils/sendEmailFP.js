const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (receiver, subject, url) => {
  try {
    const msg = {
      to: receiver, // Change to your recipient
      from: "eshan@getmedesign.com", // Change to your verified sender
      subject: subject,
      text: url,
      html: `<strong>Please change password of your account with the link-:<br /></strong><a href=${url}>${url}</a><br /><u>Note-:</u>This Link will expire in 1 hour!!!`,
    };
    await sgMail.send(msg).then(() => {
      console.log("Email sent");
    });
  } catch (error) {
    console.error(error);
  }
};
