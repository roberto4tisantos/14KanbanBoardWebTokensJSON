-- DROP DATABASE
DROP DATABASE IF EXISTS kanban_db;

-- CREATE DATABASE
CREATE DATABASE kanban_db;

-- Switch to the "kanban_db" database
\c kanban_db;

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
