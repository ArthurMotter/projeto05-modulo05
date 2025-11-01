package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;
import com.abutua.agenda_backend.dtos.TimeSlotResponse;
import com.abutua.agenda_backend.models.TimeSlot;
import com.abutua.agenda_backend.services.ProfessionalService;
import com.abutua.agenda_backend.services.mappers.TimeSlotMapper;
import com.abutua.agenda_backend.services.usecases.read.SearchProfessionalAvailabiltyDaysUseCase;
import com.abutua.agenda_backend.services.usecases.read.SearchProfessionalAvailabiltyTimesUseCase;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/professionals")
@CrossOrigin
public class ProfessionalController {

    private final ProfessionalService professionalService;

    // --- DEPENDENCIES FOR AVAILABILITY---
    private final SearchProfessionalAvailabiltyDaysUseCase searchDaysUseCase;
    private final SearchProfessionalAvailabiltyTimesUseCase searchTimesUseCase;

    // --- CONSTRUCTOR ---
    public ProfessionalController(
            ProfessionalService professionalService,
            SearchProfessionalAvailabiltyDaysUseCase searchDaysUseCase,
            SearchProfessionalAvailabiltyTimesUseCase searchTimesUseCase) {
        this.professionalService = professionalService;
        this.searchDaysUseCase = searchDaysUseCase;
        this.searchTimesUseCase = searchTimesUseCase;
    }

    // --- CRUD ENDPOINTS ---
    @GetMapping
    public ResponseEntity<Page<ProfessionalResponseDTO>> getAllProfessionals(
            @RequestParam(defaultValue = "") String name,
            @PageableDefault(page = 0, size = 10, sort = "name") Pageable pageable) {
        Page<ProfessionalResponseDTO> professionals = professionalService.getAll(name, pageable);
        return ResponseEntity.ok(professionals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> getProfessionalById(@PathVariable Integer id) {
        ProfessionalResponseDTO professional = professionalService.getById(id);
        return ResponseEntity.ok(professional);
    }

    @PostMapping
    public ResponseEntity<ProfessionalResponseDTO> createProfessional(
            @Valid @RequestBody ProfessionalRequestDTO professionalRequestDTO) {
        ProfessionalResponseDTO newProfessional = professionalService.save(professionalRequestDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newProfessional.id()).toUri();
        return ResponseEntity.created(location).body(newProfessional);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> updateProfessional(@PathVariable Integer id,
            @Valid @RequestBody ProfessionalRequestDTO professionalRequestDTO) {
        ProfessionalResponseDTO updatedProfessional = professionalService.update(id, professionalRequestDTO);
        return ResponseEntity.ok(updatedProfessional);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessional(@PathVariable Integer id) {
        professionalService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // --- AVAILABILITY ENDPOINTS ---
    @GetMapping("/{id}/availability-days")
    public ResponseEntity<List<Integer>> getAvailableDays(
            @PathVariable Integer id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<Integer> availableDays = searchDaysUseCase.executeUseCase(id, start, end);
        return ResponseEntity.ok(availableDays);
    }

    @GetMapping("/{id}/availability-times")
    public ResponseEntity<List<TimeSlotResponse>> getAvailableTimes(
            @PathVariable Integer id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<TimeSlot> availableTimes = searchTimesUseCase.executeUseCase(id, date);

        List<TimeSlotResponse> response = availableTimes.stream()
                .map(TimeSlotMapper::toTimeSlotResponseDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}