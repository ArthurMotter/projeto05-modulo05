-- Create the Areas table
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE
);

-- Create the Professionals table
CREATE TABLE professionals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create the join table for the many-to-many relationship between Professionals and Areas
CREATE TABLE professional_areas (
    professional_id INTEGER NOT NULL,
    area_id INTEGER NOT NULL,
    PRIMARY KEY (professional_id, area_id),
    FOREIGN KEY (professional_id) REFERENCES professionals(id),
    FOREIGN KEY (area_id) REFERENCES areas(id)
);