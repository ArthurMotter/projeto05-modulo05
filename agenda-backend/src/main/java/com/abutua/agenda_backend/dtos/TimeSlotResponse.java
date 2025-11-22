package com.abutua.agenda_backend.dtos;

import java.time.LocalTime;

public record TimeSlotResponse(LocalTime startTime, LocalTime endTime, boolean available) {
    
}

