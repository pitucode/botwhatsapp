import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Pertanyaan!\n*Contoh:* ${usedPrefix}${command} halo bard?`;
  
  let url = text.includes('|') ? text.split('|')[1].trim() : '';
  text = text.includes('|') ? text.split('|')[0].trim() : text;
  
  try {
    await m.reply(global.wait);
    const apii = await fetch(`https://pitucode.com/entertainment/bard?query=${text}&url=${url ? url : 'https://pitucode.com/'}&apikey=wanzet`);
    const res = await apii.json();
    await m.reply(`${res.result}`);
  } catch (e) {
    console.log(e);
    m.reply(`Terjadi kesalahan, coba lagi nanti.`);
  }
};

handler.help = ['bard'];
handler.tags = ['ai'];
handler.limit = 3;
handler.command = /^bard$/i;

export default handler;