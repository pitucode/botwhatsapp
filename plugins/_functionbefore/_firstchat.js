import moment from 'moment-timezone';
import db from '../../lib/database.js';
export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let user = db.data.users[m.sender]
    let txt = `👋Hai, ${ucapan()}
${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan bot ini lagi' : `💬Ada yg bisa ${this.user.name} bantu?`}`.trim()

    if (new Date() - user.pc < 21600000) return // waktu ori 21600000 (6 jam)
   await m.reply(`Join *Group* untuk menggunakan fitur ini\n\n*_Join Group :_* ${gclink}\n\n*_Wajib follow :_* ${linkgrup}`)

    user.pc = new Date * 1
}


function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat dinihari 🌆"
    if (time >= 4) {
        res = "Selamat pagi 🌄"
    }
    if (time > 10) {
        res = "Selamat siang ☀️"
    }
    if (time >= 15) {
        res = "Selamat sore 🌇"
    }
    if (time >= 18) {
        res = "Selamat malam 🌙"
    }
    return res
}