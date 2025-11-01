package com.abutua.agenda_backend.services.usecases.read;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abutua.agenda_backend.repositories.AppointmentRepository;

@Service
public class SearchProfessionalAvailabiltyDaysUseCase {

       @Autowired
       private AppointmentRepository appointmentRepository;

       @Transactional(readOnly = true)
       public List<Integer> executeUseCase(long  professionalId, LocalDate start, LocalDate end) {
            return this.appointmentRepository.getAvailableDaysFromProfessional(professionalId, start, end);
       }
}
