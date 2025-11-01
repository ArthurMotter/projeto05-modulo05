package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.AppointmentTypeResponse;
import com.abutua.agenda_backend.models.AppointmentType;

public class AppointmentTypeMapper {
    public static AppointmentTypeResponse toAppointmentResponseDTO(AppointmentType appointmentType) {
        return new AppointmentTypeResponse(appointmentType.getId(),appointmentType.getType());
    }
}
