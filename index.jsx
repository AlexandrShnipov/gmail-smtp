const express = require('express')
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
 
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: 'alexandershnipov@gmail.com', // generated ethereal user
    pass: 'Gavrusha+Dasha=', // generated ethereal password
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// app.get('/blabla', (req, res) => {
//   res.send('hi!')
// });

app.get('/sendMessage', async (req, res) => {
  

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Sasha', // sender address
    to: "SShnipov@gmail.com", // list of receivers
    subject: "Тестирую GMAIL", // Subject line
    // text: "ПРивет! Тестирую post-server", // plain text body
    html: "<b>ПРивет! Тестирую post-server</b>", // html body
  });

  res.send('blablabla yoyoyo!');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});