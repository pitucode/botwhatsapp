/*
import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv`
  let api = await axios.get(`https://xzn.wtf/api/igdl?url=${linknya}&apikey=${global.xzn}`)
  let wm = `${global.wm}`
  await m.reply('Sedang diproses...')
  for (let e of api.data.media)
    await conn.sendFile(m.chat, e, '', wm, m)
}
*/
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv`
  try {
    let p = await fetch(`https://pitucode.com/downloader/igdown/v3?apikey=${btc}&url=${linknya}`)
      let v = await p.json()
      let o = v.result
      await m.reply(global.wait)
      await conn.sendFile(m.chat, o.url, '', 'Done', m)
  
  } catch (e) {
    try {
      let p = await fetch(`https://pitucode.com/downloader/igdown/v2?apikey=wanzet&url=${linknya}`)
        let v = await p.json()
        let o = v.result
        await m.reply(global.wait)
        await conn.sendFile(m.chat, o, '', 'Done', m)
    } catch (e) {
      console.log(e)
      m.reply(`_server sedang maintenance kak, maaf yah_`)
    }
  }
}

handler.menudownload = ['ig'].map(v => v + ' <url>')
handler.tagsdownload = ['search']

handler.command = /^(ig(dl)?)$/i
handler.limit = true

export default handler