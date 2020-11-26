

class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT,
                message TEXT,
                sent DATETIME,
                room_name TEXT,
                FOREIGN KEY(room_name) REFERENCES rooms(room_name)
            )`
        
        return this.dao.sql_run(sql)
    }

    addNewMessage(user, message, sent, room) {
        const sql = `INSERT INTO messages 
        ( user, message, sent, room_name ) VALUES (?, ?, ?, ?)`
        return this.dao.sql_run(sql, [user, message, sent, room])
    }

    getMessagesByRoom(roomname) {
        return this.dao.sql_get(
            `SELECT user, message, sent FROM messages WHERE room_name = ?`,
            [roomname]
        )
    }
}

module.exports = MessageRepository;