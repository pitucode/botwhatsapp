
let handler = async (m, { conn, text, usedPrefix, command }) => {
  
  let [rek, saldo] = text.split('|');
  if ((!rek || !saldo)) {
    throw `*Cara penggunaan :*\n\n${usedPrefix + command} rekening|saldo\n\n*Note:* ${usedPrefix + command} 99999999|9999999999.`;
  }

  m.reply(global.wait);
  //ubah m.sender ke m.chat untuk chat public
  await conn.sendMessage(m.sender, { image: { url: `` }, caption: 'done' }, { quoted: m });
  m.reply("_success, result sudah di kirim di private chat_");
};

handler.help = ['fbca'];
handler.tags = ['faketools'];
handler.limit = 5;
handler.premium = true;
handler.command = /^(fbca)$/i;

export default handler;
