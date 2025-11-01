package com.abutua.agenda_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.agenda_backend.dtos.AppointmentTypeResponse;
import com.abutua.agenda_backend.services.AppointmentService;


@RestController
@RequestMapping("/appointment-types")
@CrossOrigin
public class AppointmentTypeController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<AppointmentTypeResponse>> getAppointmentTypes(){
        return ResponseEntity.ok().body(appointmentService.getAllTypes());
    }
    
}
