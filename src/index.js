const path = require('path');
const fs = require('fs');
const envPath = path.join(__dirname, '../', '.env');
const env = JSON.parse(fs.readFileSync(envPath).toString());

const tmi = require('tmi.js');

const levenshtein = require('./stages/levenshtein');

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
const peenCheckers = require('./stages/peen-checkers');
client.on('chat', function(channel, user, line, self) {
    if (self) {
        return;
    }

    // stage 1, find peen
    if (!peenCheckers(line)) {
        return;
    }

    // stage 2, delete message
    client.timeout(channel, user.username, 1, `I have seen bigger ${user['display-name']}`);
    client.say(channel, `Nice try ${user['display-name']}`);
});


//   chat - > send it to processors -> determine if we should remove message -> ban
