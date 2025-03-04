-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dueDate` datetime NOT NULL,
  `status` enum('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (12,'Nova Tarefa 3','Descrição da tarefa','2001-01-01 02:00:00','completed',4,'2025-02-11 13:47:17','2025-02-11 15:16:58'),(13,'Nova Tarefa 4','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 13:50:10','2025-02-11 13:50:10'),(14,'Nova Tarefa 5','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 13:52:09','2025-02-11 13:52:09'),(15,'Nova Tarefa 6','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 13:52:34','2025-02-11 13:52:34'),(16,'Nova Tarefa 7','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 13:52:53','2025-02-11 13:52:53'),(17,'Nova Tarefa 8','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:15:36','2025-02-11 14:15:36'),(18,'Nova Tarefa 9','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:17:18','2025-02-11 14:17:18'),(19,'Nova Tarefa 10','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:23:32','2025-02-11 14:23:32'),(20,'Nova Tarefa 10','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:23:50','2025-02-11 14:23:50'),(21,'Nova Tarefa 11','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:32:15','2025-02-11 14:32:15'),(22,'Nova Tarefa 12','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:33:19','2025-02-11 14:33:19'),(23,'Nova Tarefa 13','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:33:53','2025-02-11 14:33:53'),(24,'Nova Tarefa 14','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:44:22','2025-02-11 14:44:22'),(25,'Nova Tarefa 14','Descrição da tarefa','2025-01-04 00:00:00','pending',3,'2025-02-11 14:45:50','2025-02-11 14:45:50'),(26,'Nova Tarefa 15','Descrição da tarefa','2025-01-04 00:00:00','pending',3,'2025-02-11 14:47:27','2025-02-11 14:47:27'),(27,'Nova Tarefa 16','Descrição da tarefa','2001-01-01 02:00:00','pending',3,'2025-02-11 14:53:11','2025-02-11 14:53:11'),(28,'Nova Tarefa 20','Descrição da tarefa','2025-04-04 00:00:00','pending',3,'2025-02-11 14:59:16','2025-02-11 14:59:16');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'john.doe@example.com','john_doe','$2b$10$kOru0k6bYOb/KZvNB34fYOfaChzAtXXQ4sZTcdO2yKlqdw2AwZYoS','2025-02-11 13:16:54','2025-02-11 13:16:54'),(4,'alexandre2@gmail.com','Alexandre 2','$2b$10$n4KLXVngrtGVgbb8p3Goa.bXuRcYojm3LCNm2zAbtbAhizP2.14De','2025-02-11 15:16:35','2025-02-11 15:16:35'),(5,'testuser@example.com','testuser','$2b$10$Dz48xzjotlEFWNxCDqC3XuPDxHM1nJaJTT0ag7I.xd2YgEvOjyGmy','2025-02-11 23:40:27','2025-02-11 23:40:27'),(7,'newuser@example.com','newuser','$2b$10$Q/9Epm/Q6fVsGwemqq0WsuUEFggXo54VzPF0hyv/2r5KkuZekHgHy','2025-02-11 23:40:28','2025-02-11 23:40:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 21:57:27
