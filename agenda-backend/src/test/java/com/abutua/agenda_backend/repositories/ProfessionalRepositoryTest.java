package com.abutua.agenda_backend.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import com.abutua.agenda_backend.models.Professional;

@DataJpaTest
@ActiveProfiles("test")
public class ProfessionalRepositoryTest {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @BeforeEach
    void setUp() {
        professionalRepository.deleteAll(); 
    }

    @Test
    void shouldSaveAndFindProfessionalById() {
        // Arrange
        Professional professional = new Professional();
        professional.setName("Carlos Pereira");
        professional.setEmail("carlos.pereira@example.com");
        professional.setPhone("31987654321");
        
        // Act
        Professional savedProfessional = professionalRepository.save(professional);
        
        // Assert
        assertNotNull(savedProfessional.getId());
        assertEquals("Carlos Pereira", savedProfessional.getName());
    }

    @Test
    void findByNameContainingIgnoreCase_shouldReturnMatchingProfessionals() {
        // Arrange - Criando alguns profissionais para a busca
        Professional professional1 = new Professional();
        professional1.setName("Ana Silva");
        professional1.setEmail("ana.silva@example.com");
        professionalRepository.save(professional1);

        Professional professional2 = new Professional();
        professional2.setName("Andre Souza");
        professional2.setEmail("andre.souza@example.com");
        professionalRepository.save(professional2);
        
        // Act 1: Buscar por 'An', deve encontrar ambos "Ana" e "Andre"
        Page<Professional> resultPage1 = professionalRepository.findByNameContainingIgnoreCase("An", Pageable.unpaged());

        // Assert 1
        assertEquals(2, resultPage1.getTotalElements());

        // Act 2: Buscar por 'silva' (minúsculo), deve encontrar "Ana Silva"
        Page<Professional> resultPage2 = professionalRepository.findByNameContainingIgnoreCase("silva", Pageable.unpaged());

        // Assert 2
        assertEquals(1, resultPage2.getTotalElements());
        assertEquals("Ana Silva", resultPage2.getContent().get(0).getName());
        
        // Act 3: Buscar por nome inexistente
        Page<Professional> resultPage3 = professionalRepository.findByNameContainingIgnoreCase("Zebra", Pageable.unpaged());

        // Assert 3
        assertTrue(resultPage3.isEmpty());
    }
}