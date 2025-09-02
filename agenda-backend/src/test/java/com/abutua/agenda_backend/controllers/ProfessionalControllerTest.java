package com.abutua.agenda_backend.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.models.Professional;
import com.abutua.agenda_backend.repositories.AreaRepository;
import com.abutua.agenda_backend.repositories.ProfessionalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class ProfessionalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Professional professional;
    private Area area;

    @BeforeEach
    void setUp() {
        professionalRepository.deleteAll();
        areaRepository.deleteAll();

        area = new Area();
        area.setName("Cabelo");
        area = areaRepository.save(area);

        professional = new Professional();
        professional.setName("Mariana Lima");
        professional.setEmail("mariana.lima@example.com");
        professional.setPhone("11987654321");
        professional.getAreas().add(area);
        professional = professionalRepository.save(professional);
    }

    @Test
    void getProfessionalById_shouldReturn200OK_whenIdExists() throws Exception {
        mockMvc.perform(get("/professionals/{id}", professional.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(professional.getId()))
                .andExpect(jsonPath("$.name").value("Mariana Lima"));
    }

    @Test
    void getProfessionalById_shouldReturn404NotFound_whenIdDoesNotExist() throws Exception {
        mockMvc.perform(get("/professionals/{id}", 999))
                .andExpect(status().isNotFound());
    }

    @Test
    void createProfessional_shouldReturn201Created_whenDataIsValid() throws Exception {
        ProfessionalRequestDTO requestDTO = new ProfessionalRequestDTO(
                "Carlos Pereira",
                "carlos.p@example.com",
                "21999998888",
                true,
                List.of(area.getId()));

        String jsonRequest = objectMapper.writeValueAsString(requestDTO);

        mockMvc.perform(post("/professionals")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Carlos Pereira"));
    }

    @Test
    void createProfessional_shouldReturn400BadRequest_whenNameIsBlank() throws Exception {
        ProfessionalRequestDTO requestDTO = new ProfessionalRequestDTO(
                "",
                "invalid@example.com",
                "31888887777",
                true,
                List.of(area.getId()));

        String jsonRequest = objectMapper.writeValueAsString(requestDTO);

        mockMvc.perform(post("/professionals")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteProfessional_shouldReturn204NoContent_whenIdExists() throws Exception {
        mockMvc.perform(delete("/professionals/{id}", professional.getId()))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteProfessional_shouldReturn404NotFound_whenIdDoesNotExist() throws Exception {
        mockMvc.perform(delete("/professionals/{id}", 999))
                .andExpect(status().isNotFound());
    }
}