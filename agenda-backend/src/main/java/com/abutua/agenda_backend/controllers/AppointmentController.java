package com.abutua.agenda_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abutua.agenda_backend.dtos.AppointmentRequest;
import com.abutua.agenda_backend.dtos.AppointmentResponse;
import com.abutua.agenda_backend.services.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest appointmentRequest) {

        var appointmentResponse = appointmentService.createAppointment(appointmentRequest);

        var location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(appointmentResponse.id())
                .toUri();

        return ResponseEntity.created(location).body(appointmentResponse);
    }

}
