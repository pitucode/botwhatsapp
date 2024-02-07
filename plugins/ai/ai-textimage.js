
import fetch from "node-fetch";

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
  let query = `input text Ex:\n${usedPrefix + command} cat with astronout costume`;
  let text;
  
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw query;
  }
  
  try {
    m.reply(global.wait);
    let response = await fetch(
      `https://aemt.me/ai/text2img?text=${text}`
    );
    let buffer = await response.buffer(); // Akses respons sebagai buffer
    await conn.sendFile(m.chat, buffer, "", "Sudah Jadi Kak >//<", m); // Mengirim buffer file sebagai pesan
  } catch (e) {
    m.reply("_server sedang sibuk_");
  }
};

handler.help = ["text2image"];
handler.tags = ["ai"];
handler.command = /^text2image$/i;

export default handler;

