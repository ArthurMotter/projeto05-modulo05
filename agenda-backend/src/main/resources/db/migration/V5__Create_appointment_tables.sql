-- Tabela para os tipos de agendamento
CREATE TABLE tbl_appointment_type (
    id SERIAL NOT NULL, 
    type VARCHAR(255), 
    PRIMARY KEY (id)
);

-- Tabela principal de agendamentos
CREATE TABLE tbl_appointment (
    appointment_type_id INTEGER NOT NULL, 
    area_id INTEGER NOT NULL, 
    date TIMESTAMP WITH TIME ZONE NOT NULL, 
    end_time TIME WITH TIME ZONE NOT NULL, 
    start_time TIME WITH TIME ZONE NOT NULL, 
    client_id BIGINT NOT NULL, 
    id BIGSERIAL NOT NULL, 
    professional_id BIGINT NOT NULL, 
    status VARCHAR(10) NOT NULL CHECK (status IN ('PRESENT','ABSENT','OPEN','CANCEL')), 
    comments VARCHAR(1024), 
    PRIMARY KEY (id)
);

-- Adicionando as chaves estrangeiras
ALTER TABLE IF EXISTS tbl_appointment ADD CONSTRAINT FKehutpu22rmfam8t4raurkwpis FOREIGN KEY (appointment_type_id) REFERENCES tbl_appointment_type;
ALTER TABLE IF EXISTS tbl_appointment ADD CONSTRAINT FKhjyakw183cxebiqaw9lwu60ht FOREIGN KEY (area_id) REFERENCES areas;
ALTER TABLE IF EXISTS tbl_appointment ADD CONSTRAINT FKcxcaw6r3vas3hpphlwrstkg3n FOREIGN KEY (client_id) REFERENCES clients; 
ALTER TABLE IF EXISTS tbl_appointment ADD CONSTRAINT FKd2qv82ltxt451xuweu0cjvdl5 FOREIGN KEY (professional_id) REFERENCES professionals; 