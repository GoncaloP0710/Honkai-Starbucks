const mysql = require('mysql2/promise');

class UserRepository {
    constructor(connection) {
      this.connection = connection;
      this.createTable();
    }
  
    async createTable() {
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ntbb_users (
        userid varbinary(255) NOT NULL,
        usernum int(11) NOT NULL AUTO_INCREMENT,
        username varbinary(255) NOT NULL,
        password varbinary(255) DEFAULT NULL,
        nonce varbinary(255) DEFAULT NULL,
        passwordhash varbinary(255) DEFAULT NULL,
        email varbinary(255) DEFAULT NULL,
        registertime bigint(20) NOT NULL,
        ip varchar(255) NOT NULL DEFAULT '',
        account varbinary(255) DEFAULT NULL,
        logintime bigint(20) NOT NULL DEFAULT '0',
        loginip varbinary(255) DEFAULT NULL,
        PRIMARY KEY (userid),
        UNIQUE KEY usernum (usernum),
        KEY ip (ip),
        KEY loginip (loginip),
        KEY account (account)
      )`;
      await this.connection.execute(createTableQuery);
    }
  
    async findById(userid) {
      const [rows] = await this.connection.execute('SELECT * FROM ntbb_users WHERE userid = ?', [userid]);
      if (rows.length === 0) {
        return null;
      }
  
      const row = rows[0];
      return new User(row.userid, row.usernum, row.username, row.password, row.nonce, row.passwordhash, row.email, row.registertime, row.ip, row.account, row.logintime, row.loginip);
    }
  
    async save(user) {
      const { userid, usernum, username, password, nonce, passwordhash, email, registertime, ip, account, logintime, loginip } = user;
      await this.connection.execute('INSERT INTO ntbb_users (userid, usernum, username, password, nonce, passwordhash, email, registertime, ip, account, logintime, loginip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userid, usernum, username, password, nonce, passwordhash, email, registertime, ip, account, logintime, loginip]);
    }
}

module.exports = UserRepository;