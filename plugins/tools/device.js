import { getDevice } from '@whiskeysockets/baileys'

let handler = async (m) => {
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.menutools = ['device']
handler.tagstools = ['tools']
handler.command = /^(device)$/i

export default handler
