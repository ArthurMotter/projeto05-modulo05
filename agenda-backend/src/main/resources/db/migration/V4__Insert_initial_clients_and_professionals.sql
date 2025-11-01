-- Insert a sample client
INSERT INTO clients (name, phone, date_of_birth, comments) VALUES 
('João da Silva', '(11) 98765-4321', '1990-05-15', 'Cliente antigo.');

-- Insert a sample professional
INSERT INTO professionals (name, email, phone, active) VALUES 
('Maria Souza', 'maria.souza@example.com', '(11) 12345-6789', true);

-- Associate the professional with an existing area (assuming Area ID 1 = 'Cabelo' from V3)
INSERT INTO professional_areas (professional_id, area_id) VALUES (1, 1);