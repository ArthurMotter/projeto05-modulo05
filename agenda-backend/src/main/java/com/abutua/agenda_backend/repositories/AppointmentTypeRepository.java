package com.abutua.agenda_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abutua.agenda_backend.models.AppointmentType;

public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, Integer> {
        
}
