import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Example : ${usedPrefix + command} https://google.com`
	if (!isUrl(args[0])) throw `url invalid, please input a valid url. Try with add http:// or https://`
	await conn.sendFile(m.chat, `https://www.screenia.best/api/screenshot?url=${args[0]}${command.includes('full') ? '&fullscreen=true' : ''}&type=png`, '', `_${command} by ${pauthor}_`.trim(), m)
}

handler.menuinfo = ['ssweb <url>','sswebfull <url>']
handler.tagsinfo = ['information']
handler.command = /^(ss(web)?(full)?)$/i

handler.premium = true
handler.limit = true

export default handler