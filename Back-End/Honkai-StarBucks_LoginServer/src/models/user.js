class User {
    constructor(userid, usernum, username, password, nonce, passwordhash, email, registertime, ip, account, logintime, loginip) {
      this.userid = userid;
      this.usernum = usernum;
      this.username = username;
      this.password = password;
      this.nonce = nonce;
      this.passwordhash = passwordhash;
      this.email = email;
      this.registertime = registertime;
      this.ip = ip;
      this.account = account;
      this.logintime = logintime;
      this.loginip = loginip;
    }

    setNonce(nonce) {
      this.nonce = nonce;
    }

    setPasswordHash(passwordhash) {
      this.passwordhash = passwordhash;
    }

    setLoginTime(logintime) {
      this.logintime = logintime;
    }

    setLoginIp(loginip) {
      this.loginip = loginip;
    }

    getAccount() {
      return this.account;
    }

    getLoginTime() {
      return this.logintime;
    }

    getLoginIp() {
      return this.loginip;
    }

    getRegistertime() {
      return this.registertime;
    }

    getIp() {
      return this.ip;
    }

    getEmail() {
      return this.email;
    }

    getPasswordHash() {
      return this.passwordhash;
    }

    getNonce() {
      return this.nonce;
    }

    getPassword() {
      return this.password;
    }

    getUsername() {
      return this.username;
    }

    getUsernum() {
      return this.usernum;
    }

    getUserid() {
      return this.userid;
    }

    toString() {
      return `User [userid=${this.userid}, usernum=${this.usernum}, username=${this.username}, password=${this.password}, nonce=${this.nonce}, passwordhash=${this.passwordhash}, email=${this.email}, registertime=${this.registertime}, ip=${this.ip}, account=${this.account}, logintime=${this.logintime}, loginip=${this.loginip}]`;
    }
}