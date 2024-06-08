// Service: Honkai-StarBucks_LoginServer
// Abstract: Database connection and user repository

const mysql = require('mysql2');
const UserRepository = require('./repositorys/userRepository');

class DatabaseService {
  constructor() {
    this.init();
  }

  async init() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb'
    }).promise();;

    this.userRepository = new UserRepository(connection);
  }

  async getUserById(userid) {
    return await this.userRepository.findById(userid);
  }

  async saveUser(user) {
    return await this.userRepository.save(user);
  }
}

module.exports = DatabaseService;