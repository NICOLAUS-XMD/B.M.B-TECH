const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdyVkxBdkpGWUp3S24reHN3TGJhQ1c4bXZuV0RHVk1VeHkvTk9nTC9YOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzU2WGF2V1Zrdk5NMlVBNlQwbFJFa3U5SW52N2JZY3lDbEtjanJ1ZGNUZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhR3ZQVDFMcmduendzV2ZwalVZb29RVTg2MDdKa3ZuREwvR014RlF4bW5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0S0dYTWpPOGowaVdOZE1zT2JHUHFTNTVlWXAyaHhGM1F3UlpBYkllaVRBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlHQ0FCK3ZtNHBRN3R3dDBKL2tMVTdlNUFjU3poRmtoNTZqUXpqcnIvbmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlEcFA0SG5aTHo1ekRHRkdUMk9DajYwVGp0cmZ6RnNSR2dUQjBBdUhLRVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU90M2JBNnROa1NTMElWOW1PQm5ETlJ2K01IckxSeWEwN0pXNWozSkZuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHUwL2Rpb3FzUUVZZ2ZHYnVGL3REVktZVnIvazdIYlJVSCtsOWdaTVVGQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVPY2p1WkhxTlpqMlVUamNCcmh2MThoRVN5akZTcGFTRVZWT1BQenRQN0x6Vm1ZOVkrRUlWcTY1bWJpZmdSRDVOT3VhQi9VVG1SM1NRaDF0cFpubGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJEQm1GMEx6djlFTitpb0ZmcmdQangxODFvSXRwUUNTdGwyMVVzSjMzYnQwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIyUFQ4V1RNQiIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0Ojg2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1Ojg2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVNYbHFrREVKL29oY01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZGoxaCtVTXc2YTc4ZTZRM1Z6bkdVNENrdkZ6UFpFS1ZlZzk1S0Z5aWRnbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicUJsZ0MrRDE3djYyZzVyNmFGdE1CTk5GYTNGRWZEVEE1R3hueHpFUVJyNVdiRENrcVRiVjNBb2gvQnpCdmpvTzZ6QmcxY2Z0aW5yWURkK0d4bE8xQWc9PSIsImRldmljZVNpZ25hdHVyZSI6ImFxL3QvNlMxcGt0THFUTTdOVWVqOU9rRjFQc0JjaTJEbUJVTWNIWFBGNGp0aUJmS1BYdlhkKzR5VEJQOVc0QTh1aHBtZVBRUGNRdHpURVI2TlNMcWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjUyMzk4NjE0Ojg2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhZOVlmbERNT211L0h1a04xYzV4bE9BcEx4Y3oyUkNsWG9QZVNoY29uWUsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTIxNzE5OCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKOFgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

