-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2019 at 04:20 PM
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` varchar(50) COLLATE latin1_german2_ci NOT NULL,
  `ProductSKU` varchar(50) COLLATE latin1_german2_ci NOT NULL,
  `ProductName` varchar(100) COLLATE latin1_german2_ci NOT NULL,
  `ProductPrice` float NOT NULL,
  `ProductWeight` float NOT NULL,
  `ProductCartDesc` varchar(250) COLLATE latin1_german2_ci NOT NULL,
  `ProductShortDesc` varchar(500) COLLATE latin1_german2_ci DEFAULT NULL,
  `ProductLongDecs` text COLLATE latin1_german2_ci,
  `ProductThumb` varchar(100) COLLATE latin1_german2_ci DEFAULT NULL,
  `ProductImage` text COLLATE latin1_german2_ci,
  `ProductCategoryID` int(11) DEFAULT NULL,
  `ProductStock` float DEFAULT NULL,
  `ProductLive` tinyint(1) DEFAULT '0',
  `ProductUnlimited` tinyint(1) DEFAULT '1',
  `ProductLocation` varchar(250) COLLATE latin1_german2_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mimetype` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
  `filename` varchar(75) COLLATE latin1_german2_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductSKU`, `ProductName`, `ProductPrice`, `ProductWeight`, `ProductCartDesc`, `ProductShortDesc`, `ProductLongDecs`, `ProductThumb`, `ProductImage`, `ProductCategoryID`, `ProductStock`, `ProductLive`, `ProductUnlimited`, `ProductLocation`, `createdAt`, `updatedAt`, `mimetype`, `filename`) VALUES
('1', '000-0001', 'Cotton T-Shirt', 9.99, 3, 'Light Cotton T-Shirt', 'A light cotton T-Shirt made with 100% real cotton.', 'A light cotton T-Shirt made with 100% real cotton.\r\n\r\nMade right here in the USA for over 15 years, this t-shirt is lightweight and durable.', '', '', 5, 100, 1, 0, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL, ''),
('2', '000-0004', 'Los Angeles', 179.99, 8, 'Track and Trail', 'A rugged track and trail athletic shoe', 'A rugged track and trail athletic shoe', '', '', 4, NULL, 0, 1, NULL, '0000-00-00 00:00:00', '2019-04-29 15:25:24', '', ''),
('036a52d0-b754-4162-a0dd-1a7bee3a28a3', '211321-1121A', 'Jaket Gunung', 10000, 2, 'Jaket Gunung Bagus Berkualitas', 'Jaket Gunung Bagus Berkualitas', '', NULL, '', 1, NULL, 0, 1, NULL, '2019-04-18 14:33:53', '2019-04-29 15:00:27', 'image/jpeg', 'cod-ps4-3.jpg'),
('840e570e-854d-4ceb-b2ce-c0a0ed047b57', '11212', 'wdwd dwa dawd', 1000, 1, 'dsasa sasa sa ', 'sasa sas ssasa  sasa  sasa', '', NULL, NULL, 1, NULL, 0, 1, NULL, '2019-04-18 14:30:44', '2019-04-18 14:30:44', NULL, ''),
('cef221a2-7c09-44ac-a8a1-79c749bee376', '555059595', 'haha hahah hahahahaah', 10000, 2, ' kok kok kok ok oko k', 'koko okokok kok k okokok okokok ', '', NULL, NULL, 1, NULL, 0, 1, NULL, '2019-04-22 14:23:22', '2019-04-22 14:23:22', NULL, ''),
('149182f1-41ed-4865-8c09-b301f999dbd1', '5151515151', 'asasasa', 0, 0.5, 'sas sas sasa', 'sas  sasa s asa  sasa', '', '', '', NULL, NULL, 0, 1, NULL, '2019-05-03 15:22:10', '2019-05-03 15:22:10', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
