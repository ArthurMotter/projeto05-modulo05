package com.abutua.agenda_backend.models;

import java.time.OffsetTime;

public interface TimeSlot {
    OffsetTime getStartTime();
    OffsetTime getEndTime();
    boolean isAvailable();
}
