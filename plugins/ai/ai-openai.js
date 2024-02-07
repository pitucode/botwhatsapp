import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Masukkan Pertanyaan!\n*Contoh:* ${usedPrefix}${command} Kapan Indonesia merdeka?`;
  try {
    
    await m.reply(global.wait);
    const apii = await fetch(`https://aemt.me/openai?text=${text}`);
    const res = await apii.json();
    await m.reply(`${res.result}`);
  } catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
};

handler.help = ['ai'];
handler.tags = ['ai'];
handler.limit = 3;
handler.command = /^ai$/i;

export default handler;