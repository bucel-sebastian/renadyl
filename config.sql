CREATE DATABASE `renadyl_database` 

CREATE TABLE
    `users` (
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

CREATE TABLE `bank_data` ( ) 

-- POSTGRESQL

-- contact form

CREATE TABLE
    IF NOT EXISTS renadyl_contact_form (
        id integer NOT NULL,
        fname character varying(100) NOT NULL,
        lname character varying(100) NOT NULL,
        email character varying(255) NOT NULL,
        phone character varying(50),
        type character varying(100),
        message text NOT NULL,
        date timestamp without time zone NOT NULL,
        CONSTRAINT renadyl_contact_form_pkey PRIMARY KEY (id)
    ) -- product data
CREATE TABLE
    IF NOT EXISTS renadyl_product_data (
        id integer NOT NULL,
        country varchar(100) NOT NULL,
        price varchar(100) NOT NULL,
        on_sale bool NOT NULL,
        sale_price varchar(100),
        sale_value varchar(100),
        sale_percentage bool,
        currency varchar(100) NOT NULL,
        change_date timestamp without time zone NOT NULL,
        CONSTRAINT renadyl_product_data_pkey PRIMARY KEY (id)
    )

-- users

CREATE TABLE
    IF NOT EXISTS renadyl_users (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        role VARCHAR(25) NOT NULL,
        f_name VARCHAR(50),
        l_name VARCHAR(50),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(100),
        password VARCHAR(255) NOT NULL,
        register_date TIMESTAMP NOT NULL,
        last_login TIMESTAMP
    );

-- users shipping addresses

CREATE TABLE IF NOT EXISTS renadyl_shipping_details ( ) 

-- users billing addresses

CREATE TABLE IF NOT EXISTS renadyl_billing_details ( ) 

-- subscriptions

CREATE TABLE IF NOT EXISTS renadyl_subscriptions ( 

) 

-- admins

CREATE TABLE
    IF NOT EXISTS renadyl_admins (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        f_name VARCHAR(50),
        l_name VARCHAR(50),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(100),
        password VARCHAR(255) NOT NULL
    )

-- stocks

CREATE TABLE
    IF NOT EXISTS renadyl_stocks (
        id SERIAL PRIMARY KEY,
        stock_quantity INTEGER NOT NULL,
        change_date TIMESTAMP NOT NULL,
        last_stock_quantity INTEGER NOT NULL
    )

-- intrari

CREATE TABLE
    IF NOT EXISTS renadyl_product_inputs (
        id SERIAL PRIMARY KEY,
        quantity BIGINT NOT NULL,
        date TIMESTAMP NOT NULL,
        buy_price FLOAT NOT NULL,
        shipping_price FLOAT NOT NULL
    )

-- Orders

CREATE TABLE IF NOT EXISTS renadyl_orders ( 

) 

-- Invoices

CREATE TABLE IF NOT EXISTS renadyl_invoices ( ) 