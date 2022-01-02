//! 1
const express = require('express')
//! 2
const nodemailer = require("nodemailer");
// ! 4
const cors = require('cors');
// ! 5
const bodyParser = require('body-parser');
const app = express();

// const port = 3010;

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '...';
let smtp_password = process.env.SMTP_PASSWORD || '...';

//! 2!!!=== create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',

  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password // generated ethereal password
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// app.get('/blabla', (req, res) => {
//   res.send('hi!')
// });

//! 3
app.post('/sendMessage', async (req, res) => {

  let { name, email, message, position, company, testimonial } = req.body;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'My profile page', // sender address
    to: "SShnipov@gmail.com", // list of receivers
    subject: "MY PROFILE PAGE", // Subject line
    // text: "ПРивет! Тестирую post-server", // plain text body
    html: `<b>Сообщение с вашего портфолио</b>
    <table>
<tr>
  name: ${name}
</tr>
<div>
  email: ${email}
</div>
<div>
  message: ${message}
</div>
<div>
  position: ${position}
</div>
<div>
  company: ${company}
</div>
<div>
  testimonial: ${testimonial}
</div>
    </table>`
  });

  res.send('ok');

});


let port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});