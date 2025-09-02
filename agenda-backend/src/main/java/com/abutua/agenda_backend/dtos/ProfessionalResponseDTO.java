package com.abutua.agenda_backend.dtos;

import java.util.List;

public record ProfessionalResponseDTO(
    Integer id,
    String name,
    String email,
    String phone,
    boolean active,
    List<AreaDTO> areas
) {}