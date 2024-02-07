
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} 10000`
    m.reply("Proses kak...")
  await conn.sendMessage(m.sender, { image: { url: `` }, caption: 'done' }, { quoted: m})
  m.reply("_success, result sudah di kirim di private chat_");
}
handler.help = ['fdana']
handler.tags = ['faketools']
handler.limit = 5
handler.command = /^(fdana)$/i

export default handler
