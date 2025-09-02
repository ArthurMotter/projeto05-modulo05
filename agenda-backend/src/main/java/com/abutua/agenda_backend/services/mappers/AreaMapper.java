package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.models.Area;

public class AreaMapper {
    
    // Record's constructor
    public static AreaDTO toDTO(Area area) {
        return new AreaDTO(
            area.getId(),
            area.getName()
        );
    }
}