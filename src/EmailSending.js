const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



module.exports.sendEmail =  function (subject, content) {
    const msg = {
        to: 'tonka.tennis1@gmail.com', // Change to your recipient
        from: 'tonka.tennis1@gmail.com', // Change to your verified sender
        subject: subject,
        html: content,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}
