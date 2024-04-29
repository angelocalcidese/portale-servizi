SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `addon` (
  `id` int(50) NOT NULL,
  `voce` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `tipologia` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `addon` (`id`, `voce`, `url`, `icon`, `tipologia`) VALUES
(1, 'Database Dipendenti', 'gestionedipendenti', 'fa-users', 1),
(2, 'Database Risorse', 'risorse', 'fa-handshake', 1),
(3, 'Flotte', 'parcoauto', 'fa-car-side', 2),
(4, 'Beni aziendali', 'gestionebeni', 'fa-mobile-screen-button', 2),
(5, 'Whistleblowing', 'whistleblowing', 'fa-bullhorn', 2),
(6, 'Gestione Utenze', 'gestioneutenze', 'fa-users-rectangle', 3),
(7, 'Gestione Societ&agrave;', 'gestionecompany', 'fa-building', 3),
(8, 'Ticketing', 'gestionale.php', 'fa-boxes-stacked', 2);

CREATE TABLE `beni` (
  `id` int(10) NOT NULL,
  `tipologia` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modello` varchar(255) NOT NULL,
  `seriale` varchar(255) NOT NULL,
  `assegnatoa` varchar(255) NOT NULL,
  `datainserimento` varchar(50) NOT NULL,
  `dataassegnazione` varchar(50) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `beni` (`id`, `tipologia`, `marca`, `modello`, `seriale`, `assegnatoa`, `datainserimento`, `dataassegnazione`, `foto`) VALUES
(1, 'monitor', 'Hitachi', 'A-2134', 'S151515151616771717', 'Franco Bianchi', '10/01/2019', '15/02/2024', ''),
(2, 'laptop', 'Lenovo', 'A-341', 'A1661616166161525352', 'Mario Rossi', '15/12/2023', '01/03/2024', ''),
(3, 'pc fisso', 'Dell', 'M-4321', 'G166373838383929292', 'Mario Rossi', '05/11/2023', '15/12/2023', '');

CREATE TABLE `company` (
  `id` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `piva` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `active` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company` (`id`, `name`, `piva`, `address`, `email`, `telephone`, `active`) VALUES
(1, 'Saci Group S.r.l.', '11111111111111', 'via dei castelli Romani 52 Pomezia (RM)', 'info@sacigroup.it', '0686922029', 1),
(2, 'EasySw', '1234567890', 'via dei Castelli Romani 52', 'info@easysw.it', '12345678', 1),
(8, 'pincopallo', '321323123123', 'via roma 15', 'test@test.it', '1234455666', 0);

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

INSERT INTO `dipendenti` (`id`, `company`, `nome`, `cognome`, `cf`, `annodinascita`, `ruolo`, `assunzione`, `nazione`, `email`, `telefono`, `foto`) VALUES
(1, 2, 'Angelo', 'Calcidese', 'CCCCCCCCCCCCCCCCC', '12/04/2024', 'Tester', '16/04/2024', 'Italiana', 'a.calcidese@easysw.it', '3924861936', NULL),
(2, 2, 'Marco', 'Marchi', '', '', '', '', '', 'bladebiella@gmail.com', '3924861936', NULL),
(3, 1, 'Fabrizio', 'Bellavia', '', '', '', '', '', 'fabrizio.bellavia@sacigroup.it', '3492269458', NULL),
(4, 1, 'Donato', 'Caso', '', '', '', '', '', 'donato.caso@sacigroup.it', '3332202868', NULL),
(5, 1, 'Stefano', 'Castagnino', '', '', '', '', '', 'stefano.castagnino@sacigroup.it', '3489536440', NULL),
(6, 1, 'Marco', 'Cicale', '', '', '', '', '', 'mfcicale@gmail.com', '3938633495', NULL),
(7, 1, 'Enrico Maria', 'Conforti', '', '', '', '', '', 'enrico.conforti@sacigroup.it', '3703681160', NULL),
(8, 1, 'Carlo', 'De Angelis', '', '', '', '', '', 'carlo.deangelis@sacigroup.it', '3338937024', NULL),
(9, 1, 'Gabriele', 'Guadagni', '', '', '', '', '', 'gabriele.guadagni@sacigroup.it', '3440870619', NULL),
(10, 1, 'Tommaso', 'Morichini', '', '', '', '', '', 'tommaso.morichini@agoratechnology.it', '3807552089', NULL),
(11, 1, 'Silviu', 'Patranoiu', '', '', '', '', '', 'silviu.patranoiu@sacigroup.it', '3450639558', NULL),
(12, 1, 'Luigi', 'Sabatino', '', '', '', '', '', 'l.sabatino@itcarea.com', '3487881578', NULL),
(13, 1, 'Ivano', 'Silviani', '', '', '', '', '', 'ivano.silviani@sacigroup.it', '3475255951', NULL),
(14, 1, 'Cesare', 'Glavina', '', '', '', '', '', 'cesare.glavina@bcmservices.it', '3313854807', NULL);

CREATE TABLE `guidatori` (
  `id` int(10) NOT NULL,
  `veicolo` int(10) NOT NULL,
  `da` varchar(50) NOT NULL,
  `a` varchar(50) DEFAULT NULL,
  `dipendente` int(10) NOT NULL,
  `kmda` int(50) DEFAULT NULL,
  `kma` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `guidatori` (`id`, `veicolo`, `da`, `a`, `dipendente`, `kmda`, `kma`) VALUES
(1, 1, '19/04/2024', '19/04/2024', 1, 10000, 15000),
(2, 1, '19/04/2024', '23/04/2024', 0, 15000, 15000),
(3, 1, '23/04/2024', '23/04/2024', 1, 15000, 15000),
(4, 1, '23/04/2024', NULL, 2, 15000, NULL),
(5, 3, '24/04/2024', NULL, 1, 168534, NULL);

CREATE TABLE `interventi` (
  `id` int(10) NOT NULL,
  `veicolo` varchar(255) NOT NULL,
  `intervento` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL,
  `km` varchar(255) NOT NULL,
  `prezzo` varchar(255) NOT NULL,
  `fattura` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `interventi` (`id`, `veicolo`, `intervento`, `data`, `km`, `prezzo`, `fattura`) VALUES
(1, '1', 'Assicurazione', '19/04/2024', '15000', '500', NULL),
(2, '1', 'Tagliando', '19/04/2024', '15000', '500', 0x68747470733a2f2f7777772e68746d6c2e69742f61727469636f6c692f6d7973716c2d652d737570706f72746f2d6465692d7365742d64692d6361726174746572692f),
(3, '1', 'Bollo', '19/04/2024', '15000', '500', '');

CREATE TABLE `kmveicolo` (
  `id` int(10) NOT NULL,
  `veicolo` int(50) DEFAULT NULL,
  `assegnata` int(50) DEFAULT NULL,
  `kmold` int(50) DEFAULT NULL,
  `km` varchar(255) DEFAULT NULL,
  `spesacard` varchar(100) DEFAULT NULL,
  `spesaextra` varchar(100) DEFAULT NULL,
  `mese` int(50) DEFAULT NULL,
  `anno` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `kmveicolo` (`id`, `veicolo`, `assegnata`, `kmold`, `km`, `spesacard`, `spesaextra`, `mese`, `anno`) VALUES
(1, 1, 2, 20000, '25000', NULL, '150', 4, 2024),
(2, 3, 1, 168534, '200000', NULL, '100', 4, 2024);

CREATE TABLE `multicard` (
  `id` int(50) NOT NULL,
  `company` int(10) NOT NULL,
  `tipologia` varchar(255) NOT NULL,
  `codcliente` varchar(50) NOT NULL,
  `tipocontratto` varchar(255) NOT NULL,
  `statocliente` int(10) NOT NULL,
  `statocarta` int(10) NOT NULL,
  `scadenzacarta` varchar(50) NOT NULL,
  `rinnovabile` int(10) NOT NULL,
  `prodottiacq` varchar(255) NOT NULL,
  `validitaterritoriale` varchar(250) NOT NULL,
  `pin` int(10) NOT NULL,
  `codice` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `multicard` (`id`, `company`, `tipologia`, `codcliente`, `tipocontratto`, `statocliente`, `statocarta`, `scadenzacarta`, `rinnovabile`, `prodottiacq`, `validitaterritoriale`, `pin`, `codice`) VALUES
(1, 2, 'Multicard', '12345', 'Eni', 1, 1, '17/04/2024', 1, '{\"carburanti\":false,\"lubrificanti\":false,\"accessori\":false,\"gplmetano\":false}', 'Nazionale', 1233, '123445'),
(2, 1, 'Multicard', '1854892', 'ENI', 1, 1, '31/08/2027', 1, '{\"carburanti\":false,\"lubrificanti\":false,\"accessori\":false,\"gplmetano\":false}', 'Nazionale', 4381, '710200177765000029');

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `function` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `permission` (`id`, `user`, `function`) VALUES
(29, 9, 7),
(30, 9, 6),
(52, 9, 3),
(54, 9, 1),
(57, 14, 1),
(58, 14, 3),
(60, 13, 3),
(61, 13, 1);

CREATE TABLE `telepass` (
  `id` int(50) NOT NULL,
  `company` int(10) NOT NULL,
  `tipologia` varchar(255) NOT NULL,
  `codice` varchar(255) NOT NULL,
  `seriale` varchar(50) DEFAULT NULL,
  `attivazione` varchar(50) DEFAULT NULL,
  `stato` int(10) NOT NULL,
  `validitaterritoriale` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `telepass` (`id`, `company`, `tipologia`, `codice`, `seriale`, `attivazione`, `stato`, `validitaterritoriale`) VALUES
(1, 2, 'Telepass', '1234567', NULL, NULL, 1, 'Nazionale'),
(2, 1, 'Telepass', '246094104', NULL, NULL, 1, 'Nazionale'),
(3, 2, 'Telepass', '22333444444', '1111111', '01/03/2024', 1, 'Nazionale');

CREATE TABLE `typemenu` (
  `id` int(50) NOT NULL,
  `voce` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `typemenu` (`id`, `voce`, `icon`) VALUES
(1, 'Human Resources', ''),
(2, 'Gestione', ''),
(3, 'Admin', 'fa-screwdriver-wrench');

CREATE TABLE `user` (
  `id` int(50) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `active` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` int(50) NOT NULL,
  `firstaccess` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `nome`, `cognome`, `email`, `telefono`, `active`, `password`, `company`, `firstaccess`) VALUES
(9, 'Angelo', 'Calcidese', 'a.calcidese@easysw.it', '12345', 1, '$2y$10$Izssow8gNYN5E7g1O4YfeO5bR7DvhKXMnz.TNXo3Jn0RUtjjmfcO.', 2, 0),
(10, 'test', 'testone', 'assistenza@easysw.it', '123456', 1, '$2y$10$mOIqG1ijzsjlPyTbRCN0R.U/5fOC1UIf60dGb.rzrOBOOy7OIntxW', 2, 1),
(13, 'Riccardo', 'Calcidse', 'bladebiella@gmail.com', '3924861936', 1, '$2y$10$9d0qgwS1jyw7QBJnLm6q/.R.S6CJQjDEhpPYFO7Vwu..JlZTBfA3q', 1, 0),
(14, 'Logistica', 'SaciGroup', 'logistica@sacigroup.it', '0686922029', 1, '$2y$10$nqptP0Y2W4uxXJ/rxfJlsOQblU0C1frz7YcUuH..yRoLTyk50fR/K', 1, 0);

CREATE TABLE `veicoli` (
  `id` int(50) NOT NULL,
  `company` int(10) NOT NULL,
  `tipologia` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modello` varchar(255) NOT NULL,
  `targa` varchar(50) NOT NULL,
  `acquisto` varchar(50) NOT NULL,
  `vendita` varchar(10) NOT NULL,
  `assegnazione` varchar(255) NOT NULL,
  `stato` varchar(255) NOT NULL,
  `proprieta` varchar(255) NOT NULL,
  `km` varchar(50) NOT NULL,
  `distribuzione` varchar(50) NOT NULL,
  `kml` varchar(50) NOT NULL,
  `tagliando` varchar(50) NOT NULL,
  `revisione` varchar(50) NOT NULL,
  `bollo` varchar(50) NOT NULL,
  `assicurazione` varchar(50) NOT NULL,
  `multicard` varchar(50) DEFAULT NULL,
  `telepass` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `veicoli` (`id`, `company`, `tipologia`, `marca`, `modello`, `targa`, `acquisto`, `vendita`, `assegnazione`, `stato`, `proprieta`, `km`, `distribuzione`, `kml`, `tagliando`, `revisione`, `bollo`, `assicurazione`, `multicard`, `telepass`) VALUES
(1, 2, 'Autovettura', 'Mercedes', 'classe C', 'AA123BB', '09/01/2024', '', '2', 'Attiva', 'ALD', '25000', '15000', '15', '12000', '30/04/2024', '19/04/2025', '19/04/2025', '', '3'),
(2, 1, 'Furgone', 'Dacia', 'Dokker', 'FS031VV', '01/01/2020', '', '-', 'Attiva', 'Saci', '250399', '60000', '19', '15000', '', '', '11/04/2025', '2', '2'),
(3, 2, 'Furgone', 'Dacia', 'Panda', 'AA123RR', '01/01/2020', '', '1', 'Attiva', 'SACI', '200000', '60000', '19', '15000', '', '', '11/04/2025', NULL, NULL);


ALTER TABLE `addon`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `beni`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `dipendenti`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `guidatori`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `interventi`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `kmveicolo`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `multicard`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `telepass`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `typemenu`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `veicoli`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `addon`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `beni`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `company`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `dipendenti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `guidatori`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `interventi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `kmveicolo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `multicard`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

ALTER TABLE `telepass`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `typemenu`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `veicoli`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
