package com.abutua.agenda_backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abutua.agenda_backend.dtos.AppointmentRequest;
import com.abutua.agenda_backend.dtos.AppointmentResponse;
import com.abutua.agenda_backend.dtos.AppointmentTypeResponse;
import com.abutua.agenda_backend.models.Appointment;
import com.abutua.agenda_backend.repositories.AppointmentTypeRepository;
import com.abutua.agenda_backend.services.mappers.AppointmentMapper;
import com.abutua.agenda_backend.services.mappers.AppointmentTypeMapper;
import com.abutua.agenda_backend.services.usecases.write.CreateAppointmentUseCase;



@Service
public class AppointmentService {

    @Autowired
    private CreateAppointmentUseCase createAppointmentUseCase;

    @Autowired
    private AppointmentTypeRepository appointmentTypeRepository;

    @Transactional
    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = createAppointmentUseCase.executeUseCase(AppointmentMapper.fromAppointmentRequestDTO(appointmentRequest));
        return AppointmentMapper.toAppointmentResponseDTO(appointment);
    }


    @Transactional(readOnly = true)
    public List<AppointmentTypeResponse> getAllTypes(){
         return appointmentTypeRepository.findAll()
                .stream()
                .map(a -> AppointmentTypeMapper.toAppointmentResponseDTO(a))
                .collect(Collectors.toList());
    }
    
}
