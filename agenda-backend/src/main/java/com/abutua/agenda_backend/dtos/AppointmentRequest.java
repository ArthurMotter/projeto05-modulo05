package com.abutua.agenda_backend.dtos;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(

        @NotNull(message = "O campo 'date' é obrigatório.") LocalDate date,

        @NotNull(message = "O campo 'startTime' é obrigatório.") LocalTime startTime,

        @NotNull(message = "O campo 'endTime' é obrigatório.") LocalTime endTime,

        String comments,

        @NotNull(message = "O campo 'type' é obrigatório.") IntegerDTO type,

        @NotNull(message = "O campo 'area' é obrigatório.") IntegerDTO area,

        @NotNull(message = "O campo 'professional' é obrigatório.") LongDTO professional,

        @NotNull(message = "O campo 'client' é obrigatório.") LongDTO client) {

}