-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 09 sep. 2025 à 13:41
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dashboard_nuxt`
--

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

CREATE TABLE `plats` (
  `id` int(11) NOT NULL,
  `nomPlat` varchar(250) NOT NULL,
  `prixMenu` int(250) NOT NULL,
  `stockRestant` int(11) NOT NULL,
  `disponibilite` tinyint(1) NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `dateModification` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `plats`
--

INSERT INTO `plats` (`id`, `nomPlat`, `prixMenu`, `stockRestant`, `disponibilite`, `dateCreation`, `dateModification`) VALUES
(1, 'Burger Classique', 8000, 150, 1, '2025-08-28 14:10:41', '2025-08-28 14:10:41'),
(2, 'Pizza Margherita', 10000, 7, 1, '2025-08-28 14:10:41', '2025-08-28 14:10:41'),
(3, 'Salade César', 6000, 20, 1, '2025-08-28 14:10:41', '2025-08-28 14:10:41'),
(4, 'Pâtes Carbonaras', 9000, 0, 0, '2025-08-28 14:10:41', '2025-08-28 14:10:41'),
(5, 'Tiramisu', 5000, 5, 1, '2025-08-28 14:10:41', '2025-08-28 14:10:41'),
(9, 'lasagne', 7500, 0, 0, '2025-08-29 11:58:25', '2025-08-29 11:58:25'),
(12, 'tarte aux fraises', 2500, 10, 1, '2025-08-29 15:38:40', '2025-08-29 15:38:40'),
(13, 'Porc au four ', 2500, 20, 1, '2025-09-08 16:20:31', '2025-09-08 16:20:31'),
(14, 'Alloco/poulet', 3000, 7, 1, '2025-09-09 09:55:24', '2025-09-09 09:55:24');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `plats`
--
ALTER TABLE `plats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `plats`
--
ALTER TABLE `plats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
