const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'emirhancebiroglu21@hotmail.com',
            pass: 'Emirhan2165'
        } 
    })

    const mailOptions = {
        from: 'emirhancebiroglu21@hotmail.com',
        to: 'emirhancebiroglu21@hotmail.com',
        subject: `Message from ${req.body.name} : ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send("success");
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})