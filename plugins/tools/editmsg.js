let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) `masukkan teks`
	let q = m.quoted ? m.quoted : m
	if (!q.fromMe) throw `itu bukan pesan dari bot`
	await conn.sendMessage(m.chat, { text: text, edit: q })
}

handler.menutools = ['edit']
handler.tagstools = ['tools']
handler.command = /^(edit)$/i

export default handler