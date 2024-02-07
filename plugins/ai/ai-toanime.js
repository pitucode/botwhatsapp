import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import { generateImageFiles, generateImagesLinks } from "bimg";
import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  switch (command) {
    case "toanime":

    case "jadianime":
      {
        conn.toanime = conn.toanime ? conn.toanime : {};
        if (m.sender in conn.toanime)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `Fotonya Mana Kak?`;
        if (!/image\/(jpe?g|png)/.test(mime))
          throw `Mime ${mime} tidak support`;
        else conn.toanime[m.sender] = true;
        m.reply(global.wait);
        let media = await q.download?.();
        let error;
        try {
          let isTele = /image\/(png|jpe?g)/.test(mime);
          let link = await (isTele ? uploadImage : uploadFile)(media);
          let response = await fetch(
            `https://pitucode.com/photoeditor/jadianime?url=${link}&apikey=wanzet`
          );
          let buffer = await response.buffer(); // Akses respons sebagai buffer
          await conn.sendFile(m.chat, buffer, "", "Sudah Jadi Kak >//<", m); // Mengirim buffer file sebagai pesan
        } catch (er) {
          try {
            let isTele = /image\/(png|jpe?g)/.test(mime);
            let link = await (isTele ? uploadImage : uploadFile)(media);
            let response = await fetch(`https://aemt.me/toanime?url=${link}`);
            let data = await response.json(); // Data.result adalah hasil JSON dari situs yang diambil
            await conn.sendFile(m.chat, data.result, "", "Sudah Jadi Kak >//<", m); // Mengirim data buffer sebagai pesan
          } catch (er) {
            error = true;
          }
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.toanime[m.sender];
        }
      }
      break;

      case "jadigta":
  {
    conn.togta = conn.togta ? conn.togta : {};
    if (m.sender in conn.togta)
      throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
  
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) 
      throw `Fotonya Mana Kak?`;
    if (!/image\/(jpe?g|png)/.test(mime))
      throw `Mime ${mime} tidak support`;
    else 
      conn.togta[m.sender] = true;
  
    m.reply(global.wait);
    let media = await q.download?.();
    let error;
  
    try {
      let isTele = /image\/(png|jpe?g)/.test(mime);
      let link = await (isTele ? uploadImage : uploadFile)(media);
      let response = await fetch(`https://aemt.me/jadigta?url=${link}`);
      let data = await response.json(); // Data.result adalah hasil JSON dari situs yang diambil
      await conn.sendFile(m.chat, data.result, "", "Sudah Jadi Kak >//<", m); // Mengirim data buffer sebagai pesan
    } catch (er) {
      error = true;
    } finally {
      if (error) {
        m.reply("Proses Gagal :(");
      }
      delete conn.togta[m.sender];
    }
  }
  break;

  }
};
handler.help = ["jadianime","jadigta", "bimg <bing image>"];
handler.tags = ["ai"];
handler.premium = false;
handler.limit = 5;
handler.command = ["toanime", "jadianime","jadigta", "bimg", "bingimage"];
export default handler;
