import db from '../../lib/database.js'

let handler = async (m, { conn, command }) => {
	let txt = db.data.datas.teksjadibot || `❤‍🩹 *[ Chat Dengan Creator ]*
Ketik *.owner*

╔╣ *PREMIUM USER*
║ • Infinity Limit
║ • Full Akses Private Chat
╚══╣ *Harga :* Rp.10.000 / bulan

╔╣ *SEWA BOT*
║ • Dapat Premium
║ • Bebas Invit ke 1 Grup
╚══╣ *Harga :* Rp.15.000 / bulan
`
	m.reply(txt)
	//conn.relayMessage(m.chat,  {
	//	requestPaymentMessage: {
	//		currencyCodeIso4217: 'IDR',
	//		amount1000: 25000 * 1000,
	//		requestFrom: '0@s.whatsapp.net',
	//		noteMessage: {
	//			extendedTextMessage: {
	//				text: txt,
	//				contextInfo: {
	//					mentionedJid: [m.sender],
	//					externalAdReply: {
	//						showAdAttribution: true
	//					}
	//				}
	//			}
	//		}
	//	}
	//}, {})
	
	/*const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys")
	let fs = require('fs')
	var messa = await prepareWAMessageMedia({ image: fs.readFileSync('./media/anime.jpg') }, { upload: conn.waUploadToServer })
	var catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
		"productMessage": {
			"product": {
				"productImage": messa.imageMessage,
				"productId": "5838766206142201",
				"title": `Sewa Bot`,
				"description": `gaktau`,
				"currencyCode": "IDR",
				"bodyText": `gaktaukalo`,
				"footerText": `koncol`,
				"priceAmount1000": "15000000",
				"productImageCount": 100,
				"firstImageId": 1,
				"salePriceAmount1000": "15000000",
				"retailerId": `ꪶ𝐖𝐫𝐚𝐧𝐳𝐓𝐚𝐦𝐩𝐚𝐧𝐳⿻ꫂ`,
				"url": "wa.me/6282337245566"
			},
			"businessOwnerJid": "6282337245566@s.whatsapp.net",
		}
	}), { userJid: m.chat, quoted: m })
	conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })*/
}

handler.menugroup = ['jadibot']
handler.tagsgroup = ['group']
handler.command = /^(jadibot)$/i

export default handler