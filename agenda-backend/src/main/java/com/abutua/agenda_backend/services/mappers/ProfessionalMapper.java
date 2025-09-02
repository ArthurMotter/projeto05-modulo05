package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;
import com.abutua.agenda_backend.models.Professional;
import java.util.stream.Collectors;

public class ProfessionalMapper {

    public static ProfessionalResponseDTO toProfessionalResponseDTO(Professional professional) {
        return new ProfessionalResponseDTO(
            professional.getId(),
            professional.getName(),
            professional.getEmail(),
            professional.getPhone(),
            professional.isActive(),
            professional.getAreas()
                        .stream()
                        .map(area -> new AreaDTO(area.getId(), area.getName()))
                        .collect(Collectors.toList())
        );
    }

    public static Professional toProfessional(ProfessionalRequestDTO dto) {
        Professional professional = new Professional();
        professional.setName(dto.name());
        professional.setEmail(dto.email());
        professional.setPhone(dto.phone());
        professional.setActive(dto.active());

        return professional;
    }

    public static void updateProfessionalFromDTO(ProfessionalRequestDTO dto, Professional professional) {
        professional.setName(dto.name());
        professional.setEmail(dto.email());
        professional.setPhone(dto.phone());
        professional.setActive(dto.active());
    }
}