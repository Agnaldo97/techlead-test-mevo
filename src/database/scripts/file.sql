
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` int(11) NOT NULL,
  `success` int(11) DEFAULT NULL,
  `error` int(11) DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `fraud` bigint(20) DEFAULT NULL,
  `status` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `reason` enum('VALOR_NEGATIVO','DUPLICADO','') COLLATE utf8_bin DEFAULT NULL,
  `status` enum('SUCESSO','ERRO') COLLATE utf8_bin DEFAULT NULL,
  `id_file` int(11) DEFAULT NULL,
  `from` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `to` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_file` (`id_file`),
  CONSTRAINT `line_ibfk_1` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `fraud` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('SUCESSO', 'BLOQUEADO') COLLATE utf8_bin DEFAULT NULL,
  `id_file` int(11) DEFAULT NULL,
  `from` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `to` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_file` (`id_file`),
  CONSTRAINT `fraud_ibfk_1` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;