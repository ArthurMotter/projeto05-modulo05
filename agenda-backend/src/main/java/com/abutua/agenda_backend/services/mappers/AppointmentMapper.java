package com.abutua.agenda_backend.services.mappers;

import org.springframework.beans.BeanUtils;

import com.abutua.agenda_backend.dtos.AppointmentRequest;
import com.abutua.agenda_backend.dtos.AppointmentResponse;
import com.abutua.agenda_backend.dtos.IntegerDTO;
import com.abutua.agenda_backend.dtos.LongDTO;
import com.abutua.agenda_backend.models.Appointment;
import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.models.AppointmentType;
import com.abutua.agenda_backend.models.Professional;
import com.abutua.agenda_backend.models.Client;

public class AppointmentMapper {

    public static AppointmentResponse toAppointmentResponseDTO(Appointment appointment) {

        return new AppointmentResponse(
                appointment.getId(),
                appointment.getDate(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getComments(),
                appointment.getStatus(),
                new IntegerDTO(appointment.getAppointmentType().getId()),
                new IntegerDTO(appointment.getArea().getId()),
                new LongDTO(appointment.getProfessional().getId().longValue()),
                new LongDTO(appointment.getClient().getId().longValue()));
    }

    public static Appointment fromAppointmentRequestDTO(AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();

        BeanUtils.copyProperties(appointmentRequest, appointment);

        appointment.setArea(new Area(appointmentRequest.area().id()));
        appointment.setAppointmentType(new AppointmentType(appointmentRequest.type().id()));
        appointment.setProfessional(new Professional((int) appointmentRequest.professional().id()));
        appointment.setClient(new Client((int) appointmentRequest.client().id()));

        return appointment;
    }
}