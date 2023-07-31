const express = require('express');
const cors = require('cors');
const mailgun = require('mailgun-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;

    const data = {
        from: `Mail Form <${email}>`,
        to: 'nagareden00@gmail.com', // replace with your email
        subject: `New message from ${name}`,
        text: message
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false });
        } else {
            console.log(body);
            res.json({ success: true });
        }
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
