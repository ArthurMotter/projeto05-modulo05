package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.TimeSlotResponse;
import com.abutua.agenda_backend.models.TimeSlot;

public class TimeSlotMapper {

    public static TimeSlotResponse toTimeSlotResponseDTO(TimeSlot timeSlot) {
        return new TimeSlotResponse(timeSlot.getStartTime().toLocalTime(), timeSlot.getEndTime().toLocalTime(), timeSlot.isAvailable());
    }
}
