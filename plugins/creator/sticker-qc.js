
import { sticker, sticker3, addExif, video2webp } from '../../lib/sticker.js'
import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

let handler = async(m, { conn, text, args, usedPrefix, command }) => {
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input teks atau reply teks yang ingin di jadikan quote!"
   if (!text) return m.reply('masukan text')
   if (text.length > 100) return m.reply('Maksimal 100 Teks!')

let randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa', '#ffa500'];

const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')
    let name = await conn.getName(m.sender).replaceAll('\n','')
    try {
        let obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": apiColor,
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": name,
                    "photo": {
                        "url": pp
                    }
                },
                "text": text,
                "replyMessage": {}
            }]
        };

        let json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let buffer = Buffer.from(json.data.result.image, 'base64');
        let stiker = await sticker(buffer, false, wm, wm);
        await conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
    } catch (e) {
        console.log(e);
        conn.reply(m.chat, '*Sorry there was an error accepting the request.*', m);
    }
};

handler.help = ['qc teks'];
handler.tags = ['creator'];
handler.command = /^(qc|quoted|quotly)$/i;

export default handler;
