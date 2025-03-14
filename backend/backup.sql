-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: project_it_bpkp
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cuti`
--

DROP TABLE IF EXISTS `cuti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nip_user` char(18) NOT NULL,
  `id_jenis_cuti` char(3) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `alasan_cuti` varchar(255) DEFAULT '',
  `alasan_ditolak` varchar(255) DEFAULT '',
  `status` varchar(20) NOT NULL DEFAULT 'Menunggu',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_by` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_cuti_users` (`nip_user`),
  KEY `fk_cuti_jenis_cuti` (`id_jenis_cuti`),
  CONSTRAINT `fk_cuti_jenis_cuti` FOREIGN KEY (`id_jenis_cuti`) REFERENCES `jenis_cuti` (`id`),
  CONSTRAINT `fk_cuti_users` FOREIGN KEY (`nip_user`) REFERENCES `user` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuti`
--

LOCK TABLES `cuti` WRITE;
/*!40000 ALTER TABLE `cuti` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jenis_cuti`
--

DROP TABLE IF EXISTS `jenis_cuti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jenis_cuti` (
  `id` char(3) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `max_days` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jenis_cuti`
--

LOCK TABLES `jenis_cuti` WRITE;
/*!40000 ALTER TABLE `jenis_cuti` DISABLE KEYS */;
INSERT INTO `jenis_cuti` VALUES ('C01','Cuti Tahunan',12),('C02','Cuti Besar',90),('C03','Cuti Sakit',NULL),('C04','Cuti Melahirkan',90),('C05','Cuti Karena Alasan Penting',30);
/*!40000 ALTER TABLE `jenis_cuti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `nip` char(18) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `tmt` date NOT NULL,
  `is_ppk` tinyint(1) NOT NULL,
  PRIMARY KEY (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('111111111111111111','Nur Rofiq','$2a$10$47gzXvSxEK6RTW5a1PlzsuQfiShjv0Ywl56ecQ17vXHUgMW6D6oA.','Auditor Terampil','2024-04-01',0),('222222222222222222','Aqsal Ramadhan Arrijal','$2a$10$qZ.zkE2cyWS5rd87WlLYfufnookt8g6Qg6HoZzG35iqD9i//xLLJi','Auditor Terampil','2023-07-01',0),('333333333333333333','Eko Khafid Firmansyah','$2a$10$AGctI/yOz/qZ3CPgSpr8Z.zsOgN945WTTsRfSRlEbUgMYxfhhu0Y2','Auditor Terampil','2021-09-01',0),('444444444444444444','Ibnu Khotamul Aulad','$2a$10$dVUz.dRdaeEiiF7raSchGeGeYR1z6Jiem8cXVeUKNf0v3NYF/Fhxu','Auditor Terampil','2019-03-01',0),('555555555555555555','Ardi Perdana Sukma','$2a$10$hi/m2R14Cwh0xvHNkm9eMOYEIs5.FB0Nk9fZKut/eahIIKPjvUDky','Auditor Ahli Pertama','2017-10-01',0),('666666666666666666','Raden Mas Aris Santosa','$2a$10$2avRsIIpTmGK43nGG/fCmOp5eZfwpSsSP3UwaYL72Rn3R8CPPsj92','Kepala Biro SDM','1994-05-01',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-14 18:31:34