package com.abutua.agenda_backend.converters;

import java.time.DayOfWeek;

import jakarta.persistence.AttributeConverter;

public interface DayOfWeekInterface extends AttributeConverter<DayOfWeek, Integer>{
    
}
