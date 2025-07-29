const express = require('express');
const Sequelize = require('sequelize')

const fs = require('node:fs');
const path = require('node:path');

const foldersPath = path.join(__dirname, 'endpoints');
const commandFolders = fs.readdirSync(foldersPath);

const bodyParser = require('body-parser');

const app = express();

const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: console.log,
    storage: './db.sqlite'
});

const users = db.define("users", require("./database/user"))
users.sync();

const msgs = db.define("msgs", require("./database/message"))
msgs.sync();

const database = {
    db, users, msgs
}

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for(const commandfile of commandFiles) {
        const filePath = path.join(commandsPath, commandfile);

        const { method, endpoint, cmd } = require(filePath);

        if(method && endpoint && cmd) {
            app[method](endpoint, async (req, res) => {
                try {
                    await cmd(database, req, res);
                } catch(err) {
                    console.log(err);
                    res.sendStatus(500);
                }
            });
        }
    }
}

app.listen(3000, () => {
    console.log(`Server started : https://localhost:${3000}`);
})
