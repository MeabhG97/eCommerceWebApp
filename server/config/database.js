const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, 
    {useNewUrlParser: true, useUnifiedTopology: true});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection Error'));
database.once('open', () => {console.log('Connected to ', database.client.s.url)});
