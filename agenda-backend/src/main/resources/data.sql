-- This file will only be executed in the 'dev' profile
-- to populate the database with sample data.

-- Delete existing data in the correct order to respect foreign key constraints
DELETE FROM tbl_appointment;
DELETE FROM tbl_work_schedule_item;
DELETE FROM professional_areas;
-- DELETE FROM tbl_appointment; -- Keep this commented until you test appointment creation
DELETE FROM professionals;
DELETE FROM clients;
DELETE FROM areas;
DELETE FROM tbl_appointment_type;

-- Reset all sequences to ensure IDs start from 1
ALTER SEQUENCE tbl_appointment_id_seq RESTART WITH 1;
ALTER SEQUENCE professionals_id_seq RESTART WITH 1;
ALTER SEQUENCE clients_id_seq RESTART WITH 1;
ALTER SEQUENCE areas_id_seq RESTART WITH 1;
ALTER SEQUENCE tbl_appointment_type_id_seq RESTART WITH 1;
ALTER SEQUENCE tbl_work_schedule_item_id_seq RESTART WITH 1;
-- ALTER SEQUENCE tbl_appointment_id_seq RESTART WITH 1;

-- --------------------------------------------------------------------------------

-- Populate parent tables first
INSERT INTO areas (name) VALUES ('Cabelo'), ('Manicure e Pedicure'), ('Estética Facial'), ('Estética Corporal'), ('Massagem'), ('Depilação');

INSERT INTO tbl_appointment_type (type) VALUES ('Corte'), ('Coloração'), ('Consulta');

INSERT INTO professionals (name, email, phone, active) VALUES
('Ana Silva', 'ana.silva@example.com', '(11) 98765-4321', true),
('Bruno Costa', 'bruno.costa@example.com', '(21) 91234-5678', true),
('Carla Dias', 'carla.dias@example.com', '(31) 95555-8888', false);

INSERT INTO clients (name, phone, date_of_birth, comments) VALUES
('Mariana Lima', '(11) 99999-1111', '1990-05-15', 'Prefere produtos hipoalergênicos.'),
('Pedro Oliveira', '(21) 98888-2222', '1985-11-20', NULL),
('Juliana Souza', '(31) 97777-3333', '2001-02-10', 'Cliente nova, primeira visita.'),
('Ricardo Mendes', '(41) 96666-4444', '1995-09-01', 'Agendamento sempre no final da tarde.');

-- Populate child/join tables last
INSERT INTO professional_areas (professional_id, area_id) VALUES 
(1, 1), (1, 2), -- Ana Silva
(2, 3), (2, 5), -- Bruno Costa
(3, 6);         -- Carla Dias

INSERT INTO tbl_work_schedule_item (professional_id, day_of_week, start_time, end_time, slot_size) VALUES 
(1, 2, '09:00:00', '18:00:00', 30), -- Ana Silva on Tuesdays
(1, 4, '10:00:00', '20:00:00', 60), -- Ana Silva on Thursdays
(2, 1, '08:00:00', '12:00:00', 30); -- Bruno Costa on Mondays