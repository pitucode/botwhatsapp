import { aksaraToLatin } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Ubah Aksara Jawa ke Latin\n\nContoh :\n*${usedPrefix + command} ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀*`
	try {
		let anu = await aksaraToLatin(text)
		m.reply(`*Hasil :*\n${anu}`)
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan, coba lagi nanti.`)
	}
}

handler.menutools = ['tolatin <teks>']
handler.tagstools = ['tools']
handler.command = /^((aksara)?tolatin)$/i

export default handler