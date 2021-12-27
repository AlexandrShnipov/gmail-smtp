const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

let smtp_login = process.env.SMTP_LOGIN ||  'alexandershnipov@gmail.com';
let smtp_password = process.env.SMTP_PASSWORD ||  'Gavrusha+Dasha=';

// const port = 3010;

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

    let {message, email, name} =req.body;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'My profile page', // sender address
    to: "SShnipov@gmail.com", // list of receivers
    subject: "My profile page", // Subject line
    // text: "ПРивет! Тестирую post-server", // plain text body
    html: `<b>Сообщение с вашего потфолио</b>
<div>
  name: ${name}
</div>
<div>
  email: ${email}
</div>
<div>
  message: ${message}
</div>`
  });

  res.send('ok');

});


let port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});