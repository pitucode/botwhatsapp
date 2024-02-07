import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

var handler = async (m, { conn, args,  usedPrefix, command }) => {
    if (!args[0]) throw `*Cara penggunaan :*\n\n${usedPrefix + command} https://vt.tiktok.com/ZS8ABHoGU`
   // try {
   //     m.reply('_Sedang diproses..._')
   //     const { thumbnail, video, audio } = await tiktokdl(args[0])
   //     const url = video
   //     if (!url) throw 'Can\'t download video!'
   //     await conn.sendMessage(m.chat, { video: { url: url } }, m)
   // } catch (e) {
   //     console.log(e)
   //     m.reply(`_Server error utama error, sedang menghubungkan server 2, mohon ditunggu_`)
   // }
    try {
        let p = await fetch(`https://pitucode.com/downloader/musically?apikey=${btc}&url=${args[0]}`)
        let v = await p.json()
        let o = v.result.url_nowm
        await m.reply('_proses..._')
        await conn.sendFile(m.chat, o, '', 'Done', m)
      } catch (e) {
        console.log(e)
        m.reply(`_Server error / sedang perbaikan_`)
      }
}

handler.menudownload = ['tiktok'].map(v => v + ' <url>')
handler.tagsdownload = ['search']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i
handler.limit = true

export default handler

async function tiktokdl(url) {
    if (!/tiktok/.test(url)) return error.link;
    const gettoken = await axios.get("https://tikdown.org/id");
    const $ = cheerio.load(gettoken.data);
    const token = $("#download-form > input[type=hidden]:nth-child(2)").attr(
        "value"
    );
    const param = {
        url: url,
        _token: token,
    };
    const {
        data
    } = await axios.request("https://tikdown.org/getAjax?", {
        method: "post",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        },
    });
    var getdata = cheerio.load(data.html);
    if (data.status) {
        return {
            status: true,
            thumbnail: getdata("img").attr("src"),
            video: getdata("div.download-links > div:nth-child(1) > a").attr("href"),
            audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"),
        };
    } else
        return {
            status: false,
        };
};