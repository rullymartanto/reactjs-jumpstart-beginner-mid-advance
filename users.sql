-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2019 at 09:15 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(250) NOT NULL,
  `remember_token` varchar(100)  NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `remember_token`, `createdAt`, `updatedAt`) VALUES
('2a8111b4-3a87-a187-961c-56c22bc4e15f', 'john doe', 'john1@doe.com', '$2a$08$F21gzeNqcKQ2GNFjPicsDeoejxxIU/iLzjBQM6dpv8G0BdQZGSvu.', NULL, '2019-04-08 20:14:30', '2019-04-08 20:14:30'),
('2e0dea83-2c37-4351-8952-20adeed1d256', 'rully', 'rmartanto@gmail.com', '$2a$08$Y7UtKJJTmfjnIoCDDeJ9ZeURfVaLdteX0KBbHPnD5MxOkl1J91SAa', NULL, '2019-05-13 14:00:02', '2019-05-13 14:00:02'),
('67c33efe-019b-c4b6-09fa-07fa16527524', 'john doe', 'john@doe.com', '$2a$10$ioz5YyqpAWTNxAomyfaK3.dI3enGciPPmv6N4mhwKmbFrJWd4wXIm', NULL, '2019-04-05 10:35:48', '2019-04-05 10:35:48'),
('ef12086b-64b0-4e32-8e7a-796567727da6', 'john doe', 'john111@doe.com', '$2a$08$DqeupM6In7p9gouuPSX3C.6c/xY0hAur/dUA73s5W2YVjRTE4q5Gy', NULL, '2019-04-08 21:37:04', '2019-04-08 21:37:04'),
('f0cac69d-db11-4b53-8da3-b76dc7bdd2ef', 'john doe', 'john11@doe.com', '$2a$08$dgNU3ZRfXZlYdez1jvM2U.HajQPSQGgp7Vpf36sAZ.djgixGmUGCK', NULL, '2019-04-08 21:35:47', '2019-04-08 21:35:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
