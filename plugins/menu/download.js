import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import moment from 'moment-timezone'
import { join } from 'path'
import fs from 'fs'

let tagsdownload = {
	'search': 'Supported Media',
}
const defaultMenu = {
before: `
━ ━ *[ ⌛ DOWNLOADER ]* ━ ━
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
		let menudownload = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
			menudownload: Array.isArray(plugin.tagsdownload) ? plugin.menudownload : [plugin.menudownload],
			tagsdownload: Array.isArray(plugin.tagsdownload) ? plugin.tagsdownload : [plugin.tagsdownload],
			prefix: 'customPrefix' in plugin,
			enabled: !plugin.disabled,
			}
		})
		for (let plugin of menudownload)
			if (plugin && 'tagsdownload' in plugin)
			for (let tag of plugin.tagsdownload)
				if (!(tag in tagsdownload) && tag) tagsdownload[tag] = tag
		conn.downloadmenu = conn.downloadmenu ? conn.downloadmenu : {}
		let before = conn.downloadmenu.before || defaultMenu.before
		let header = conn.downloadmenu.header || defaultMenu.header
		let body = conn.downloadmenu.body || defaultMenu.body
		let footer = conn.downloadmenu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagsdownload).map(tag => {
			return header.replace(/%category/g, tagsdownload[tag]) + '\n' + [
				...menudownload.filter(downloadmenu => downloadmenu.tagsdownload && downloadmenu.tagsdownload.includes(tag) && downloadmenu.menudownload).map(downloadmenu => {
				return downloadmenu.menudownload.map(menudownload => {
					return body.replace(/%cmd/g, downloadmenu.prefix ? menudownload : '%p' + menudownload)
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

handler.help = ['menudownload']
handler.tags = ['submenu']
handler.command = /^(downloadm(enu)?|m(enu)?download)$/i

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
 