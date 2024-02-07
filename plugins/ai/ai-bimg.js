
import { generateImageFiles, generateImagesLinks } from "bimg";

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
    let response = await generateImageFiles(text)
    await conn.sendFile(m.chat, response.data, "", "Sudah Jadi Kak >//<", m); // Mengirim buffer file sebagai pesan
  } catch (e) {
    m.reply("_server sedang sibuk_");
  }
};

handler.help = ["bimg"];
handler.tags = ["ai"];
handler.command = /^bimg$/i;

export default handler;

