CREATE TABLE IF NOT EXISTS `ntbb_users` (
  `userid` varbinary(255) NOT NULL,
  `usernum` int(11) NOT NULL AUTO_INCREMENT,
  `username` varbinary(255) NOT NULL,
  `password` varbinary(255) DEFAULT NULL,
  `nonce` varbinary(255) DEFAULT NULL,
  `passwordhash` varbinary(255) DEFAULT NULL,
  `email` varbinary(255) DEFAULT NULL,
  `registertime` bigint(20) NOT NULL,
  `ip` varchar(255) NOT NULL DEFAULT '',
  `account` varbinary(255) DEFAULT NULL,
  `logintime` bigint(20) NOT NULL DEFAULT '0',
  `loginip` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `usernum` (`usernum`),
  KEY `ip` (`ip`),
  KEY `loginip` (`loginip`),
  KEY `account` (`account`)
)