CREATE DATABASE `renadyl_database`

CREATE TABLE `users` (
    id INT(11) NOT NULL AUTO_INCREMENT, uId VARCHAR(255) NOT NULL PRIMARY KEY, type INT(10) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phone_number VARCHAR(100) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, last_login DATETIME, register_date DATETIME NOT NULL, password VARCHAR(255) NOT NULL,
)

CREATE TABLE `bank_data` () -- POSTGRESQL
-- contact form

CREATE TABLE IF NOT EXISTS renadyl_contact_form (
    id serial PRIMARY KEY, fname character varying(100) NOT NULL, lname character varying(100) NOT NULL, email character varying(255) NOT NULL, phone character varying(50), type character varying(100), message text NOT NULL, date timestamp without time zone NOT NULL, status INTEGER NOT NULL DEFAULT 0,
) -- Distributors form

CREATE TABLE IF NOT EXISTS renadyl_distributors_form (
    id serial PRIMARY KEY, fname character varying(100) NOT NULL, lname character varying(100) NOT NULL, email character varying(255) NOT NULL, phone character varying(50), company_name character varying(255), company_cif character varying(255), message text NOT NULL, date timestamp without time zone NOT NULL, status INTEGER NOT NULL DEFAULT 0, status_update_date TIMESTAMP without time zone, observations text
) -- product data
CREATE TABLE IF NOT EXISTS renadyl_products_data (
    id serial PRIMARY KEY, product_name VARCHAR(255) NOT NULL, price jsonb NOT NULL, on_sale jsonb NOT NULL, sale_price jsonb NOT NULL, sale_value jsonb NOT NULL, sale_percentage jsonb NOT NULL, change_date timestamp without time zone NOT NULL
) -- users

CREATE TABLE IF NOT EXISTS renadyl_users (
    id VARCHAR(50) NOT NULL PRIMARY KEY, role VARCHAR(25) NOT NULL, f_name VARCHAR(50), l_name VARCHAR(50), email VARCHAR(100) NOT NULL, phone VARCHAR(100), password VARCHAR(255) NOT NULL, register_date TIMESTAMP NOT NULL, last_login TIMESTAMP, status INTEGER NOT NULL DEFAULT 0, activation_code VARCHAR(50)
);

-- users shipping addresses

CREATE TABLE IF NOT EXISTS renadyl_shipping_details (
    id serial PRIMARY KEY, client_id VARCHAR(100) NOT NULL, f_name VARCHAR(50) NOT NULL, l_name VARCHAR(50) NOT NULL, phone VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, country VARCHAR(100) NOT NULL, country_key VARCHAR(100) NOT NULL, state VARCHAR(100) NOT NULL, state_key VARCHAR(100) NOT NULL, city VARCHAR(100) NOT NULL, city_key VARCHAR(100) NOT NULL, postal_code VARCHAR(50) NOT NULL, address VARCHAR(250) NOT NULL, date TIMESTAMP NOT NULL
) -- users billing addresses

CREATE TABLE
    IF NOT EXISTS renadyl_billing_details (
        id serial PRIMARY KEY,
        client_id VARCHAR(100) NOT NULL,
        entity VARCHAR(10) NOT NULL,
        f_name VARCHAR(50),
        l_name VARCHAR(50),
        cpmpany_name VARCHAR(100),
        company_cui VARCHAR(50),
        phone VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        country_key VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        state_key VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        city_key VARCHAR(100) NOT NULL,
        postal_code VARCHAR(50) NOT NULL,
        address VARCHAR(250) NOT NULL,
        date TIMESTAMP NOT NULL


) -- subscriptions


CREATE TABLE IF NOT EXISTS renadyl_subscriptions ( 
    id serial PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    subscription_value VARCHAR(255) NOT NULL,
    start_date DATE,
    last_billing_date DATE,
    actual_billing_date DATE,
    next_billing_date DATE,
    last_shipping_awb DATE,
    actual_shipping_awb DATE,
    payment_token TEXT,
    payment_data TEXT,
    


) -- admins


CREATE TABLE IF NOT EXISTS renadyl_admins (
    id VARCHAR(50) NOT NULL PRIMARY KEY, role VARCHAR(25) NOT NULL, f_name VARCHAR(50), l_name VARCHAR(50), email VARCHAR(100) NOT NULL, phone VARCHAR(100), password VARCHAR(255) NOT NULL, last_login TIMESTAMP, status INTEGER NOT NULL DEFAULT 0
) -- stocks

CREATE TABLE IF NOT EXISTS renadyl_stocks (
    id SERIAL PRIMARY KEY, lot_id VARCHAR(255) NOT NULL, stock_quantity INTEGER NOT NULL, change_date TIMESTAMP NOT NULL, last_stock_quantity INTEGER NOT NULL
) -- intrari

CREATE TABLE IF NOT EXISTS renadyl_product_inputs (
    id SERIAL PRIMARY KEY, quantity BIGINT NOT NULL, date TIMESTAMP NOT NULL, buy_price FLOAT NOT NULL, shipping_price FLOAT NOT NULL
) -- Orders

CREATE TABLE IF NOT EXISTS renadyl_orders (
    id VARCHAR(50) NOT NULL PRIMARY KEY, date TIMESTAMP WITHOUT TIME ZONE NOT NULL, client_id VARCHAR(255), doctor jsonb, shipping_details TEXT NOT NULL, billing_details TEXT NOT NULL, cart TEXT NOT NULL, currency VARCHAR(10) NOT NULL, country_code VARCHAR(5) NOT NULL, payment varchar(10) NOT NULL, payment_status text, invoice TEXT, shipping_awb TEXT, promo_code TEXT, order_total DOUBLE NOT NULL, products_total DOUBLE NOT NULL, vat_procent DOUBLE NOT NULL, vat_total DOUBLE NOT NULL, shipping_total DOUBLE NOT NULL, promo_total DOUBLE NOT NULL, status VARCHAR(50) NOT NULL, logs TEXT, observations TEXT
) -- Invoices

CREATE TABLE IF NOT EXISTS renadyl_invoices (
    id VARCHAR(50) NOT NULL PRIMARY KEY, date TIMESTAMP WITHOUT TIME ZONE NOT NULL, order_id VARCHAR(50) NOT NULL
) -- promo codes
CREATE TABLE IF NOT EXISTS renadyl_promo_codes (
    code VARCHAR(100) NOT NULL PRIMARY KEY, user_id VARCHAR(255), value VARCHAR(100) NOT NULL, times_of_use INTEGER, times_used INTEGER NOT NULL DEFAULT 0, for_user_id VARCHAR(255), create_date date
)
-- Lots and exp DATABASE
CREATE TABLE IF NOT EXISTS renadyl_lots (
    id serial, lot_number VARCHAR(100) NOT NULL PRIMARY KEY, exp_date DATE NOT NULL, added_date TIMESTAMP NOT NULL
)

CREATE TABLE IF NOT EXISTS renadyl_request_cancel_order (
    id serial PRIMARY KEY, order_id VARCHAR(255) NOT NULL, date TIMESTAMP NOT NULL, reason VARCHAR(255), status VARCHAR(10) NOT NULL
)

CREATE TABLE IF NOT EXISTS renadyl_settings (
    id serial PRIMARY KEY, 
     name VARCHAR(255) NOT NULL UNIQUE,
      value TEXT NOT NULL,
       update_date TIMESTAMP


) 

CREATE TABLE IF NOT EXISTS renadyl_doctor_details (
    id serial PRIMARY KEY,
    doctor_id VARCHAR(255) REFERENCES renadyl_users (id) ON DELETE CASCADE,
    doctor_status INT NOT NULL DEFAULT 0,
    url_profile TEXT,
    title VARCHAR(255),
    specialization varchar(255),
    state VARCHAR(255),
    city VARCHAR(255),
    work_unit VARCHAR(255),
    attached_documents jsonb


) 