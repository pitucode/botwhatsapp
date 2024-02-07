
let handler = async(m, { conn, text, usedPrefix, command }) => {
  let [nama ,saldo, rek] = text.split('|');
    if ((!nama || !saldo || !rek)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nama|saldo|rek\n\n*Note:*\n${usedPrefix + command} trizybot|99999999|9999999999.`
    m.reply(global.wait);
  
//ubah m.sender ke m.chat untuk chat public
  await conn.sendMessage(m.sender, { image: { url: `` }, caption: 'done' }, { quoted: m})
  m.reply("_success, result sudah di kirim di private chat_");
}
handler.help = ['fbni']
handler.tags = ['faketools']
handler.limit = 5
handler.premium = true;
handler.command = /^(fbni)$/i

export default handler
