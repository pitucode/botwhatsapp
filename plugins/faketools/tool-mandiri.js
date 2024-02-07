let handler = async(m, { conn, text, usedPrefix, command }) => {
 let [nama, rek, saldo] = text.split('|');
  
 if (!nama || !rek || !saldo) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nama|rekening|saldo\n\n*Note:*${usedPrefix + command} BOTNIH|99999999|9999999999.`
  
 m.reply(global.wait);
  
 await conn.sendMessage(m.sender, { image: { url: `` }, caption: 'done' }, { quoted: m})
 m.reply("_success, result sudah di kirim di private chat_");
}
handler.help = ['fmandiri']
handler.tags = ['faketools']
handler.limit = 5
handler.premium = true;
handler.command = /^(fmandiri)$/i

export default handler