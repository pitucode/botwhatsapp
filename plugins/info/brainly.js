// pake lolapi kalo modul brainly error di panel
import { Brainly } from 'brainly-scraper-v2'

Brainly.initialize()
const brain = new Brainly('id')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Soekarno adalah`
	try {
		let anu = await brain.search(text)
		let txt = '*Result :*'
		for (let x of anu) {
			txt += `\n\n*QUESTION :*\n${x.question.content}\n`
			for (let y of x.question.attachments) {
				txt += `_- ${y}_\n`
			}
			txt += `*ANSWER :*\n${x.answers[0].content}\n`
			for (let y of x.answers[0].attachments) {
				txt += `_- ${y}_\n`
			}
			txt += `───────────────────`
		}
		await m.reply(txt.replace(/(<([^>]+)>)/ig, ''))
	} catch (e) {
		console.log(e)
		throw 'informasi tidak tersedia'
	}
}

handler.menuinfo = ['brainly <teks>']
handler.tagsinfo = ['information']
handler.command = /^(brainly)$/i

handler.premium = true
handler.limit = true

export default handler