import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import moment from 'moment-timezone'
import { join } from 'path'

let tagsgenshin = {
	'search': 'Genshin Data',
}
const defaultMenu = {
	before: `
Genshin Impact JSON data with a robust searching API! Updated to version 3.8. Sources from the fandom wiki and GenshinData repo.

━ ━ *[ 🐳 GENSHIN COMMAND ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let meh = padLead(ranNumb(39), 3)
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let nais = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/genshin.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menugenshin = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menugenshin: Array.isArray(plugin.tagsgenshin) ? plugin.menugenshin : [plugin.menugenshin],
				tagsgenshin: Array.isArray(plugin.tagsgenshin) ? plugin.tagsgenshin : [plugin.tagsgenshin],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menugenshin)
			if (plugin && 'tagsgenshin' in plugin)
				for (let tag of plugin.tagsgenshin)
					if (!(tag in tagsgenshin) && tag) tagsgenshin[tag] = tag
		conn.genshinmenu = conn.genshinmenu ? conn.genshinmenu : {}
		let before = conn.genshinmenu.before || defaultMenu.before
		let header = conn.genshinmenu.header || defaultMenu.header
		let body = conn.genshinmenu.body || defaultMenu.body
		let footer = conn.genshinmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsgenshin).map(tag => {
				return header.replace(/%category/g, tagsgenshin[tag]) + '\n' + [
					...menugenshin.filter(genshinmenu => genshinmenu.tagsgenshin && genshinmenu.tagsgenshin.includes(tag) && genshinmenu.menugenshin).map(genshinmenu => {
						return genshinmenu.menugenshin.map(menugenshin => {
							return body.replace(/%cmd/g, genshinmenu.prefix ? menugenshin : '%p' + menugenshin)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.genshinmenu == 'string' ? conn.genshinmenu : typeof conn.genshinmenu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await  conn.relayMessage(m.chat, {
			extendedTextMessage:{
		  text: text, 
		  contextInfo: {
		  mentionedJid: [m.sender],
			   externalAdReply: {
				  title: `Hai kak ${name}`,
				  body: `${ucapan()}`,
				  mediaType: 1,
				  previewType: 0,
				  renderLargerThumbnail: false,
				  thumbnailUrl: 'https://telegra.ph//file/b15d8090ba938c8124e84.jpg',
				  sourceUrl: linkgrup
			  }
		  }, mentions: [m.sender]
}}, {})
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menugenshin']
handler.tags = ['submenu']
handler.command = /^(genshinm(enu)?|m(enu)?genshin)$/i

export default handler

function ucapan() {
	const time = moment.tz('Asia/Jakarta').format('HH')
	let res = "Kok Belum Tidur Kak? 🥱"
	if (time >= 4) {
	  res = "Selamat pagi"
	}
	if (time >= 10) {
	  res = "Selamat siang"
	}
	if (time >= 15) {
	  res = "Selamat sore"
	}
	if (time >= 18) {
	  res = "Selamat malam"
	}
	return res
  }
 