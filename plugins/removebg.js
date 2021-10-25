/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const SL-BROO-BOT = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const Config = require('../config');
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const stream = require('stream');
const {promisify} = require('util');

const pipeline = promisify(stream.pipeline);

const Language = require('../language');
const Lang = Language.getString('removebg');

if (Config.WORKTYPE == 'private') {

    SL-BROO-BOT.addCommand({pattern: 'removebg ?(.*)', fromMe: true, desc: Lang.REMOVEBG_DESC}, (async (message, match) => {    

        if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO,MessageType.text);
        if (Config.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,Lang.NO_API_KEY.replace('remove.bg', 'https://github.com/phaticusthiccy/WhatsAsenaDuplicated/wiki/Remove-BG-API-Key'),MessageType.text);
    
        var load = await message.reply(Lang.RBGING);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Config.RBG_API_KEY
            }
        }); 
    
        await pipeline(
		    rbg,
		    fs.createWriteStream('✯ɪͥᴛͭsᷤᴍͫᴇͤ☚⃟፝✪ɴᴇᴛʜᴍɪᴋᴀ✯ʙʀᴏᴏ✪🙈😻.PNG')
        );
    
        await message.client.sendMessage(message.jid,fs.readFileSync('✯ɪͥᴛͭsᷤᴍͫᴇͤ☚⃟፝✪ɴᴇᴛʜᴍɪᴋᴀ✯ʙʀᴏᴏ✪🙈😻.PNG'), MessageType.document, {filename: 'WhatsAsena.png', mimetype: Mimetype.png});
        await load.delete();
    }));
}
else if (Config.WORKTYPE == 'public') {

    SL-BROO-BOT.addCommand({pattern: 'removebg ?(.*)', fromMe: false, desc: Lang.REMOVEBG_DESC}, (async (message, match) => {    

        if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO,MessageType.text);
        if (Config.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,Lang.NO_API_KEY.replace('remove.bg', 'https://github.com/phaticusthiccy/WhatsAsenaDuplicated/wiki/Remove-BG-API-Key'),MessageType.text);
    
        var load = await message.reply(Lang.RBGING);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Config.RBG_API_KEY
            }
        }); 
    
        await pipeline(
		    rbg,
		    fs.createWriteStream('✯ɪͥᴛͭsᷤᴍͫᴇͤ☚⃟፝✪ɴᴇᴛʜᴍɪᴋᴀ✯ʙʀᴏᴏ✪🙈😻.PNG')
        );
    
        await message.client.sendMessage(message.jid,fs.readFileSync('✯ɪͥᴛͭsᷤᴍͫᴇͤ☚⃟፝✪ɴᴇᴛʜᴍɪᴋᴀ✯ʙʀᴏᴏ✪🙈😻.PNG'), MessageType.document, {filename: 'removedfile.png', mimetype: Mimetype.png});
        await load.delete();
    }));
    
}

