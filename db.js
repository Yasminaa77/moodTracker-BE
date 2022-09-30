import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password:process.env.MYSQLPASSWORD,
    database:process.env.MYSQLDATABASE,
    port:process.env.MYSQLPORT,
}).promise()






/*****      Functions     *****/

export async function getMoods() {
    const [rows] = await pool.query("SELECT * FROM mood ORDER BY id DESC")
    return rows
}

// exports.getMoods = getMoods
// const moods = await getMoods()


export async function addMood(note, timestamp, rating) {

    let query = `INSERT INTO mood(note,timestamp, rating) VALUE (?, ?, ?)`
    let [newMoodInfo] = await pool.query(query, [note, timestamp, rating]);
    // return
}

// exports.addMood = addMood
// const addingMood = await addMood()



export async function updateMood(moodId, note, rating) {
    let query = `
        UPDATE mood
        SET note = ?, rating = ?
        WHERE mood.id=? ;`

    await pool.query(query, [note, rating, moodId])
    // return
}



export async function deleteMood(moodId) {
    let query = `DELETE FROM mood WHERE mood.id = ?`
    await pool.query(query, [moodId])
    // return
}