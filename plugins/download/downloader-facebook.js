import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const linknya = args[0]

  if (!args[0]) throw `*Cara penggunaan :*\n\n${usedPrefix + command} https://www.facebook.com/watch/?v=793340257859248`
  try {
    let p = await fetch(`https://pitucode.com/downloader/facebook?apikey=${btc}&url=${linknya}`)
    let v = await p.json()
    let o = v.result.video
    await m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, o, '', 'Done', m)
  } catch (e) {
    console.log(e)
    m.reply(`_server error atau video di private_`)
  }
}

handler.menudownload = ['fb'].map(v => v + ' <url>')
handler.tagsdownload = ['search']
handler.limit = true

handler.command = /^(fb(dl)?)$/i

export default handler