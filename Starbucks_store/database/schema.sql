CREATE DATABASE IF NOT EXISTS starbucksDB;

USE starbucksDB;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postalCode FLOAT,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    features TEXT NOT NULL,
    hasArtwork BOOLEAN NOT NULL,
    storeName VARCHAR(255) NOT NULL,
    storeNumber VARCHAR(255) NOT NULL,
    closeTime TIME,
    openTime TIME
);
