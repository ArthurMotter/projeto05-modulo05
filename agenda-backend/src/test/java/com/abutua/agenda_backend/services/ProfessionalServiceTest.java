package com.abutua.agenda_backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;
import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.models.Professional;
import com.abutua.agenda_backend.repositories.AreaRepository;
import com.abutua.agenda_backend.repositories.ProfessionalRepository;
import com.abutua.agenda_backend.services.exceptions.ResourceNotFoundException;

@ExtendWith(MockitoExtension.class)
public class ProfessionalServiceTest {

    @Mock
    private ProfessionalRepository professionalRepository;

    @Mock
    private AreaRepository areaRepository;

    @InjectMocks
    private ProfessionalService professionalService;

    private Professional professional;
    private Area area;
    private ProfessionalRequestDTO professionalRequestDTO;

    @BeforeEach
    void setUp() {
        area = new Area(1, "Cabelo");
        professional = new Professional(1, "Ana Silva", "ana.silva@example.com", "11999998888", true, Set.of(area));
        
        // Mock construtor do DTO
        professionalRequestDTO = new ProfessionalRequestDTO(
            "Ana Silva", 
            "ana.silva@example.com", 
            "11999998888", 
            true, 
            List.of(1)
        );
    }

    @Test
    void getById_shouldReturnProfessional_whenIdExists() {
        when(professionalRepository.findById(1)).thenReturn(Optional.of(professional));

        ProfessionalResponseDTO result = professionalService.getById(1);

        assertNotNull(result);
        assertEquals(1, result.id());
        assertEquals("Ana Silva", result.name());
        verify(professionalRepository, times(1)).findById(1);
    }

    @Test
    void getById_shouldThrowResourceNotFoundException_whenIdDoesNotExist() {
        when(professionalRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            professionalService.getById(99);
        });
        
        verify(professionalRepository, times(1)).findById(99);
    }

    @SuppressWarnings("unchecked")
    @Test
    void save_shouldCreateAndReturnNewProfessional() {
        // Arrange
        // O método findAllById espera um Iterable (List ou Set) e retorna uma List
        when(areaRepository.findAllById(any(List.class))).thenReturn(List.of(area));
        when(professionalRepository.save(any(Professional.class))).thenReturn(professional);

        // Act
        ProfessionalResponseDTO result = professionalService.save(professionalRequestDTO);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.id());
        assertEquals("Ana Silva", result.name());
        verify(areaRepository, times(1)).findAllById(any(List.class));
        verify(professionalRepository, times(1)).save(any(Professional.class));
    }
}