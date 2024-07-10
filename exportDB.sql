SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `addon` (
  `id` int(50) NOT NULL,
  `voce` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `tipologia` int(50) NOT NULL,
  `position` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `addon` (`id`, `voce`, `url`, `icon`, `tipologia`, `position`) VALUES
(6, 'Gestione Utenze', 'gestioneutenze', 'fa-users-rectangle', 3, 6),
(7, 'Gestione Societ&agrave;', 'gestionecompany', 'fa-building', 3, 3),
(9, 'Gestione Utenze Dipendenti', 'utenzadipendenti', 'fa-users', 1, 0),
(13, 'Gestione Ruoli', 'gestioneruoli', 'fa-wand-magic-sparkles\r\n', 3, 7),
(14, 'Gestione Macro Menu', 'gestioneVociMenu', 'fa-heading', 3, 4),
(15, 'Gestione Addons', 'gestioneAddons', 'fa-object-ungroup', 3, 5),
(18, 'Gestione Utenze Company', 'gestioneutenzecompany', 'fa-user', 3, 2),
(19, 'Gestione Portale', 'gestioneportale', 'fa-gear', 3, 1);

CREATE TABLE `company` (
  `id` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `piva` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `active` int(10) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `colori` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company` (`id`, `name`, `piva`, `address`, `email`, `telephone`, `active`, `foto`, `colori`) VALUES
(2, 'EasySw', '1234567890', 'via dei Castelli Romani 52', 'info@easysw.it', '12345678', 1, 'logo_2.png', '{\"logo\":\"#F16522\",\"header\":\"#EAE7DC\",\"textmenu\":\"\"}');

CREATE TABLE `dipendenti` (
  `id` int(100) NOT NULL,
  `company` int(10) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `cf` varchar(50) DEFAULT NULL,
  `annodinascita` varchar(50) DEFAULT NULL,
  `ruolo` varchar(255) DEFAULT NULL,
  `assunzione` varchar(50) DEFAULT NULL,
  `nazione` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `foto` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `function` int(11) NOT NULL,
  `cud` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `permission` (`id`, `user`, `function`, `cud`) VALUES
(1, 19, 13, 0),
(2, 19, 14, 0),
(3, 19, 15, 0),
(4, 19, 9, 0),
(5, 19, 6, 0),
(6, 32, 13, 0),
(7, 32, 14, 0),
(8, 32, 15, 0),
(9, 32, 9, 0),
(10, 32, 6, 0),
(11, 19, 18, 0),
(12, 32, 18, 0),
(13, 19, 19, 0),
(14, 32, 19, 0);

CREATE TABLE `role` (
  `id` int(10) NOT NULL,
  `ruolo` varchar(255) DEFAULT NULL,
  `company` int(10) DEFAULT NULL,
  `function` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `typemenu` (
  `id` int(50) NOT NULL,
  `position` int(10) NOT NULL,
  `voce` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `typemenu` (`id`, `position`, `voce`, `icon`) VALUES
(1, 4, 'Human Resources', ''),
(2, 2, 'Gestione', ''),
(3, 1, 'Super Admin', 'fa-screwdriver-wrench'),
(4, 3, 'Operation', '');

CREATE TABLE `user` (
  `id` int(50) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `cf` varchar(100) DEFAULT NULL,
  `ruolo` varchar(255) DEFAULT NULL,
  `role` int(10) DEFAULT NULL,
  `assunzione` varchar(50) DEFAULT NULL,
  `citta` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `regione` varchar(255) DEFAULT NULL,
  `annodinascita` varchar(100) DEFAULT NULL,
  `nazione` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `active` int(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `company` int(50) NOT NULL,
  `firstaccess` int(10) NOT NULL DEFAULT '0',
  `view` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `nome`, `cognome`, `cf`, `ruolo`, `role`, `assunzione`, `citta`, `provincia`, `regione`, `annodinascita`, `nazione`, `email`, `telefono`, `active`, `password`, `company`, `firstaccess`, `view`) VALUES
(19, 'Angelo', 'Calcidese', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a.calcidese@easysw.it', '12345', 1, '$2y$10$Izssow8gNYN5E7g1O4YfeO5bR7DvhKXMnz.TNXo3Jn0RUtjjmfcO.', 2, 0, 0),
(32, 'Domenico', 'Calcidese', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'domenico.calcidese@gmail.com', '3755575840', 1, '$2y$10$n2sFDqOlI34yDHkZL3HlBOOmS7AEu4jAMgJYPkWhtWaoheADLx71S', 2, 0, 1);


ALTER TABLE `addon`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `dipendenti`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `typemenu`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `addon`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `company`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `dipendenti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

ALTER TABLE `role`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `typemenu`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

CREATE TABLE `configurazioni` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `valore` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `configurazioni` (`id`, `nome`, `valore`) VALUES
(1, 'colorelogin', '#c1c2c0');


ALTER TABLE `configurazioni`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `configurazioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;