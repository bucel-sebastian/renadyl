CREATE DATABASE `renadyl_database`


CREATE TABLE `users` (
    id INT(11) NOT NULL AUTO_INCREMENT,
    uId VARCHAR(255) NOT NULL PRIMARY KEY,
    type INT(10) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(100) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    last_login DATETIME,
    register_date DATETIME NOT NULL,
    password VARCHAR(255) NOT NULL,
)

CREATE TABLE `bank_data` (
    
)