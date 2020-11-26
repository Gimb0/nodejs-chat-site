const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class RoomDAO {
    constructor(dbFile = './db.sqlite') {
        this.db = new sqlite3.Database(dbFile, (err) => {
            if(err) {
                console.log("Could not connext to database", err)
            } else {
                console.log("Connected to database");
            }
        })
    }

    sql_run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if(err) {
                    console.log('Error running SQL: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({id: this.lastID})
                }
            })
        })
    }

    sql_get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if(err) {
                    console.log('Error running SQL: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    sql_all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if(err) {
                    console.log('Error running SQL: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = RoomDAO