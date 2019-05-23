-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 24, 2019 at 12:13 AM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chefling`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(5) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'adsad', 'asdasd', 'ansasdasd@ans.com', '$2a$10$uNcmn/X9p6OXcigoJX.gBuGO9h.bSIDkJa9h2RYhqBGBbATqwoeNC'),
(2, 'anshul', NULL, 'anshul@ans.com', '$2a$10$646zu2LRHlaMT3XocD8bLOG7UTU0RYgnwHo.W1wKC.y8rV8i3mYEO'),
(3, 'anshul', 'agrawal', 'anshul@anshul.com', '$2a$10$CQUetfCuvUf7aOWdAu.rv.Vw9SEWhv/pvDSpi2i3g8UUCqiyv8N3u'),
(4, 'asdasd', 'asdasd', 'asdasd@adssd.com', '$2a$10$lQVKH6hJr87R56slSjWq9.F3GE/kPEFX5UR0ih3LpWVybP1zZFCh.'),
(5, 'asdad', 'asdasd', 'adsa@ads.c', '$2a$10$/.ROvEhzeAtJUBO8GAI5F.0sC9xWHzKnDY/CHol0UsryaUjqpkane');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
