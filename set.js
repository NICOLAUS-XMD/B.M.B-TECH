const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUIyajVRd1BYdHRtY0xzQ29GaGVPT3pNSkY2ME14eFllRnBMRzcrTXVrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWx5MGhLUjJIK0VIVkZsa2ltTU9EUmZhOFZJZEtUTzE2bDBUNyt6bVJRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TE56N3JvWURjQzJ5N0UyTWR6VVBINWZmUWtVNTYvanRkci9GOXErTldzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWOGpnc2RTQm5wYXlER0t4SlNIQ1VzNFlWaG1PaWVzUjBYRCs3WXB4R1RVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNPY1p1QjJiZVJXM1RVNG1HbE53WDgwWGgvOGM4SmpqSWlKUUZrQ1lFbm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNQVTZ1cE51bDVRcGtGYk9QOVg5andPQTFiTUhGdGowQzVlMjFkUG5aUW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtaTGxWRDZBcHFBbUVjVTNqVzhXSFRCeEhTZnBURmpKdU1FRlJrVlVsWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWtTa0xuUWhOY0xRK3ZIRStKbWhEcUQ4a1FwcXNoOEl5SVZnUHFlc3pWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVSYmluaEZFNEdhS3lUNVpUOHAwTE5lOEU3d0FlMTh1M2NrSzJra2R0c0hHemtZaFlURUJVbTMrUkNNZlR5V1VmbGpuZ2NJemJzQ25UdWlvcjZWbWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJoa1Rod2dLOGkwV25FREN1anpXcm5UdTM2YUgvYzhmWUwvVjlUdFg3TXdrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1QkQ3MENBRkM5REIyN0ExODlCMDcxRDE1MTNGRTU2NSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMzM0MzE0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJYOUhONzFIUSIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0Ojc4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1Ojc4QGxpZCIsIm5hbWUiOiJOaWNvbGF1cyBEYW5pZWwgMiDwn5iI8J+YiPCfmIgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01LWGxxa0RFTEQyejhJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRqMWgrVU13NmE3OGU2UTNWem5HVTRDa3ZGelBaRUtWZWc5NUtGeWlkZ289IiwiYWNjb3VudFNpZ25hdHVyZSI6IllZcXhNMzllVXBCcDJVVzgzM3VVMzVIeG4vaWNCSFNCOHhsQW9hZW9tSUdYVW9Hd2ZIRlc4VVRhZUZqcWNDbVdtZlRnRmJiMVY4RjFZWFVUL3JkYUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJlNUYwU3BBRTNIN2JTRWxuZzRocEFlaEx4Nms3cnU3dXBPejdnQW9naWRaZDY5OG80Uy9HQkhPOTdlTWJnRENPSEJXUVBqRURDbTA3Qk1XRkE1aWZpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo3OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYWTlZZmxETU9tdS9IdWtOMWM1eGxPQXBMeGN6MlJDbFhvUGVTaGNvbllLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTAzMzQyODIsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjhYIn0=',
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

