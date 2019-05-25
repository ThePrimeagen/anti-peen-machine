const path = require('path');
const fs = require('fs');
const envPath = path.join(__dirname, '../', '.env');
const env = JSON.parse(fs.readFileSync(envPath).toString());

const tmi = require('tmi.js');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true
    },
    identity: env,
    channels: ['#theprimeagen']
};

const client = new tmi.client(options);
client.connect();

// main point of contact
client.on('chat', function(user, line, message, self) {
    if (self) {
        return;
    }

    console.log(user.username, line);
});


//   chat - > send it to processors -> determine if we should remove message -> ban
