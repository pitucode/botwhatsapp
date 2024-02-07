import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
 if (!text) throw `Masukan Pertanyaan!\n*Contoh:* ${usedPrefix}${command} Kapan indonesia maju?`
  try {
   
      await m.reply(global.wait);
      const apii = await fetch(`https://aemt.me/gptgo?text=${text}`);
      const res = await apii.json();
await m.reply(`${res.result}`)
      
}catch (err) {
  console.error(err);
  m.reply('server sibuk')
}
}
handler.help = ['gpt']
handler.tags = ['ai']
handler.limit = 3
handler.command = /^gpt$/i


export default handler