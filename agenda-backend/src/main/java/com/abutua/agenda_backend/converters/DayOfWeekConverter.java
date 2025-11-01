package com.abutua.agenda_backend.converters;

import java.time.DayOfWeek;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class DayOfWeekConverter implements AttributeConverter<DayOfWeek, Integer> {

    @Override
    public Integer convertToDatabaseColumn(DayOfWeek dayOfWeek) {
        return AttributeConverterUtil.dayOfWeekInterface.convertToDatabaseColumn(dayOfWeek);
    }

    @Override
    public DayOfWeek convertToEntityAttribute(Integer dayOfWeek) {
        return AttributeConverterUtil.dayOfWeekInterface.convertToEntityAttribute(dayOfWeek);
    }
}