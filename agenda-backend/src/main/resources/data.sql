-- This file will only be executed in the 'dev' profile
-- to populate the database with sample data.

-- Delete existing data to ensure a clean slate on each run
DELETE FROM professional_areas;
DELETE FROM clients;
DELETE FROM professionals;
ALTER SEQUENCE clients_id_seq RESTART WITH 1;
ALTER SEQUENCE professionals_id_seq RESTART WITH 1;


-- Populate Professionals table
INSERT INTO professionals (name, email, phone, active) VALUES
('Ana Silva', 'ana.silva@example.com', '(11) 98765-4321', true),
('Bruno Costa', 'bruno.costa@example.com', '(21) 91234-5678', true),
('Carla Dias', 'carla.dias@example.com', '(31) 95555-8888', false);

-- Populate Clients table
INSERT INTO clients (name, phone, date_of_birth, comments) VALUES
('Mariana Lima', '(11) 99999-1111', '1990-05-15', 'Prefere produtos hipoalergênicos.'),
('Pedro Oliveira', '(21) 98888-2222', '1985-11-20', NULL),
('Juliana Souza', '(31) 97777-3333', '2001-02-10', 'Cliente nova, primeira visita.'),
('Ricardo Mendes', '(41) 96666-4444', '1995-09-01', 'Agendamento sempre no final da tarde.');

-- Link Professionals to Areas
-- Ana Silva (ID 1) -> Cabelo (ID 1), Manicure e Pedicure (ID 2)
INSERT INTO professional_areas (professional_id, area_id) VALUES (1, 1);
INSERT INTO professional_areas (professional_id, area_id) VALUES (1, 2);

-- Bruno Costa (ID 2) -> Estética Facial (ID 3), Massagem (ID 5)
INSERT INTO professional_areas (professional_id, area_id) VALUES (2, 3);
INSERT INTO professional_areas (professional_id, area_id) VALUES (2, 5);

-- Carla Dias (ID 3) -> Depilação (ID 6)
INSERT INTO professional_areas (professional_id, area_id) VALUES (3, 6);