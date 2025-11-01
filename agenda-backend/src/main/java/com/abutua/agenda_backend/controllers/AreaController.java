package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;
import com.abutua.agenda_backend.services.AreaService;
import com.abutua.agenda_backend.services.ProfessionalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/areas")
@CrossOrigin
public class AreaController {

    private final AreaService areaService;
    private final ProfessionalService professionalService;

    // -- CONSTRUCTOR --
    public AreaController(AreaService areaService, ProfessionalService professionalService) {
        this.areaService = areaService;
        this.professionalService = professionalService;
    }

    // GET
    @GetMapping
    public ResponseEntity<List<AreaDTO>> findAll() {
        List<AreaDTO> areas = areaService.findAll();
        return ResponseEntity.ok(areas);
    }

    // GET BY {areaId}
    @GetMapping("/{id}/professionals")
    public ResponseEntity<Page<ProfessionalResponseDTO>> findProfessionalsByArea(
            @PathVariable Integer id, Pageable pageable) {

        Page<ProfessionalResponseDTO> professionals = professionalService.findByAreaId(id, pageable);
        return ResponseEntity.ok(professionals);
    }
}