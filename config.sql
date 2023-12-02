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
        id serial PRIMARY KEY,
        fname character varying(100) NOT NULL,
        lname character varying(100) NOT NULL,
        email character varying(255) NOT NULL,
        phone character varying(50),
        type character varying(100),
        message text NOT NULL,
        date timestamp without time zone NOT NULL
    ) -- Distributors form

CREATE TABLE
    IF NOT EXISTS renadyl_distributors_form (
        id serial PRIMARY KEY,
        fname character varying(100) NOT NULL,
        lname character varying(100) NOT NULL,
        email character varying(255) NOT NULL,
        phone character varying(50),
        company_name character varying(255),
        company_cif character varying(255),
        message text NOT NULL,
        date timestamp without time zone NOT NULL,
        status CHARACTER varying(50),
        status_update_date TIMESTAMP without time zone,
        observations text
    ) -- product data
CREATE TABLE
    IF NOT EXISTS renadyl_products_data (
        id serial PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        price varchar(150) NOT NULL,
        on_sale VARCHAR(150) NOT NULL,
        sale_price VARCHAR(150) NOT NULL,
        sale_value varchar(150) NOT NULL,
        sale_percentage VARCHAR(150) NOT NULL,
        change_date timestamp without time zone NOT NULL
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

CREATE TABLE
    IF NOT EXISTS renadyl_orders (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        client_details text NOT NULL,
        doctor VARCHAR(100),
        shipping_details TEXT NOT NULL,
        billing_details TEXT NOT NULL,
        product_quantity INTEGER NOT NULL,
        product_price VARCHAR(50) NOT NULL,
        currency VARCHAR(50) NOT NULL,
        is_bundle BOOLEAN NOT NULL,
        product_totals VARCHAR(50) NOT NULL,
        order_promotion VARCHAR(50) NOT NULL,
        order_total VARCHAR(50) NOT NULL,
        invoice VARCHAR(100),
        shipping_awb VARCHAR(255) NOT NULL,
        promo_code VARCHAR(100) REFERENCES renadyl_promo_codes(code),
        promo_code_details VARCHAR(100),
        status VARCHAR(50) NOT NULL,
        logs TEXT NOT NULL,
        observations TEXT
    )

-- Invoices

CREATE TABLE
    IF NOT EXISTS renadyl_invoices (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        order_id VARCHAR(50) NOT NULL

) -- promo codes
CREATE TABLE
    IF NOT EXISTS renadyl_promo_codes (
        code VARCHAR(100) NOT NULL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        value VARCHAR(100) NOT NULL
    )