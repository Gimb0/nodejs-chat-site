class RoomRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS rooms (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                room_name TEXT UNIQUE
            )`
        return this.dao.sql_run(sql)
    }

    addNewRoom(name) {
        const sql = `INSERT INTO rooms (room_name) VALUES (?)`
        return this.dao.sql_run(sql, [name])
    }

    getAllRooms() {
        return this.dao.sql_all(`SELECT * FROM rooms`)
    }

    doesRoomExist(name) {
        this.dao.sql_run(`SELECT room_name FROM rooms WHERE room_name = ?`, [name])
        .then(res => {
            console.log(res)
            if(res != null)
                return true

            return false
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = RoomRepository;