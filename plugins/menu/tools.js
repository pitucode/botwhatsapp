import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import moment from 'moment-timezone'
import fs from 'fs'

let tagstools = {
	'tools': 'TOOLS MENU',
}
const defaultMenu = {
before: `
━ ━ *[ ⌛ TOOLS SUB MENU ]* ━ ━
`.trimStart(),
header: '╭─「 %category 」',
body: '│ • %cmd',
footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = 'https://i.ibb.co/Cnr25XH/zero.jpg'
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let menutools = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
			menutools: Array.isArray(plugin.tagstools) ? plugin.menutools : [plugin.menutools],
			tagstools: Array.isArray(plugin.tagstools) ? plugin.tagstools : [plugin.tagstools],
			prefix: 'customPrefix' in plugin,
			enabled: !plugin.disabled,
			}
		})
		for (let plugin of menutools)
			if (plugin && 'tagstools' in plugin)
			for (let tag of plugin.tagstools)
				if (!(tag in tagstools) && tag) tagstools[tag] = tag
		conn.downloadmenu = conn.downloadmenu ? conn.downloadmenu : {}
		let before = conn.downloadmenu.before || defaultMenu.before
		let header = conn.downloadmenu.header || defaultMenu.header
		let body = conn.downloadmenu.body || defaultMenu.body
		let footer = conn.downloadmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagstools).map(tag => {
			return header.replace(/%category/g, tagstools[tag]) + '\n' + [
				...menutools.filter(downloadmenu => downloadmenu.tagstools && downloadmenu.tagstools.includes(tag) && downloadmenu.menutools).map(downloadmenu => {
				return downloadmenu.menutools.map(menutools => {
					return body.replace(/%cmd/g, downloadmenu.prefix ? menutools : '%p' + menutools)
					.trim()
				}).join('\n')
				}),
				footer
			].join('\n')
			})
		].join('\n')
		let text = typeof conn.downloadmenu == 'string' ? conn.downloadmenu : typeof conn.downloadmenu == 'object' ? _text : ''
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

handler.help = ['menutools']
handler.tags = ['submenu']
handler.command = /^(toolsm(enu)?|m(enu)?tools)$/i

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
 