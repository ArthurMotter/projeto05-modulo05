package com.abutua.agenda_backend.dtos;

import java.time.LocalDate;

public record ClientResponseDTO(
    Integer id,
    String name,
    String phone,
    LocalDate dateOfBirth,
    String comments
) {}