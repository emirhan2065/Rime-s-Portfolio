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
        port: 587,
        service: 'gmail',
        auth: {
            user: 'rimeofcodes@gmail.com',
            pass: 'Emirhan2165'
        } 
    })

    const mailOptions = {
        from: 'rimeofcodes@gmail.com',
        to: 'rimeofcodes@gmail.com',
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