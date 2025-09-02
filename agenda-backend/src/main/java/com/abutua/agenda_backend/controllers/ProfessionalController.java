package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;
import com.abutua.agenda_backend.services.ProfessionalService;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/professionals")
@CrossOrigin
public class ProfessionalController {

    private final ProfessionalService professionalService;

    public ProfessionalController(ProfessionalService professionalService) {
        this.professionalService = professionalService;
    }

    // GET BY {name}
    @GetMapping
    public ResponseEntity<Page<ProfessionalResponseDTO>> getAllProfessionals(
            @RequestParam(defaultValue = "") String name,
            @PageableDefault(page = 0, size = 10, sort = "name") Pageable pageable) {

        Page<ProfessionalResponseDTO> professionals = professionalService.getAll(name, pageable);
        return ResponseEntity.ok(professionals);
    }

    // GET BY {ID}
    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> getProfessionalById(@PathVariable Integer id) {
        ProfessionalResponseDTO professional = professionalService.getById(id);
        return ResponseEntity.ok(professional);
    }

    // POST
    @PostMapping
    public ResponseEntity<ProfessionalResponseDTO> createProfessional(@Valid @RequestBody ProfessionalRequestDTO professionalRequestDTO) {
        ProfessionalResponseDTO newProfessional = professionalService.save(professionalRequestDTO);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newProfessional.id())
                .toUri();

        return ResponseEntity.created(location).body(newProfessional);
    }

    // UPDATE BY {ID}
    @PutMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> updateProfessional(@PathVariable Integer id, @Valid @RequestBody ProfessionalRequestDTO professionalRequestDTO) {
        ProfessionalResponseDTO updatedProfessional = professionalService.update(id, professionalRequestDTO);
        return ResponseEntity.ok(updatedProfessional);
    }
    
    // DELETE BY {ID}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessional(@PathVariable Integer id) {
        professionalService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}