CREATE TABLE TBL_WORK_SCHEDULE_ITEM (
    id BIGSERIAL PRIMARY KEY,
    professional_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, ..., 6=Saturday
    start_time TIME WITH TIME ZONE NOT NULL,
    end_time TIME WITH TIME ZONE NOT NULL,
    slot_size INTEGER NOT NULL, -- Duration of each slot in minutes
    
    CONSTRAINT fk_work_schedule_professional 
        FOREIGN KEY (professional_id) 
        REFERENCES professionals(id)
);

-- OPTIONAL: Add some example work schedules
-- Professional with ID=1 works on Tuesdays (day=2) from 9am to 6pm in 30-min slots
--INSERT INTO TBL_WORK_SCHEDULE_ITEM (professional_id, day_of_week, start_time, end_time, slot_size) 
--VALUES (1, 2, '09:00:00', '18:00:00', 30);

-- Professional with ID=1 also works on Thursdays (day=4) from 10am to 8pm in 60-min slots
--INSERT INTO TBL_WORK_SCHEDULE_ITEM (professional_id, day_of_week, start_time, end_time, slot_size) 
--VALUES (1, 4, '10:00:00', '20:00:00', 60);