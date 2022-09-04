const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// Admin 12345

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json({ extended: true }));

app.use('/api/auth', require('../auth/routes/auth.routes'));

const PORT = process.env.PORT || config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('uri'), {});
        app.listen(PORT, () => console.log(`App has been run on port ${PORT}`));
    } catch (err) {
        console.log('error!', err.message);
        process.exit(1);
    }
}

start();