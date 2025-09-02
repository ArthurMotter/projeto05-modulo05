package com.abutua.agenda_backend.services;

import com.abutua.agenda_backend.dtos.ProfessionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfessionalResponseDTO;

import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.models.Professional;
import com.abutua.agenda_backend.repositories.AreaRepository;
import com.abutua.agenda_backend.repositories.ProfessionalRepository;
import com.abutua.agenda_backend.services.exceptions.ResourceNotFoundException;
import com.abutua.agenda_backend.services.mappers.ProfessionalMapper;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfessionalService {

    private final ProfessionalRepository professionalRepository;
    private final AreaRepository areaRepository;

    public ProfessionalService(ProfessionalRepository professionalRepository, AreaRepository areaRepository) {
        this.professionalRepository = professionalRepository;
        this.areaRepository = areaRepository;
    }

    // GET BY {name}
    @Transactional(readOnly = true)
    public Page<ProfessionalResponseDTO> getAll(String name, Pageable pageable) {
        Page<Professional> professionalsPage;

        if (name != null && !name.isBlank()) {
            professionalsPage = professionalRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            professionalsPage = professionalRepository.findAll(pageable);
        }

        return professionalsPage.map(ProfessionalMapper::toProfessionalResponseDTO);
    }

    // GET BY {ID}
    @Transactional(readOnly = true)
    public ProfessionalResponseDTO getById(Integer id) {
        Professional professional = professionalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professional not found with id: " + id));

        return ProfessionalMapper.toProfessionalResponseDTO(professional);
    }
    
    // GET
    @Transactional(readOnly = true)
    public List<ProfessionalResponseDTO> getAll() {
        return professionalRepository.findAll()
                .stream()
                .map(ProfessionalMapper::toProfessionalResponseDTO)
                .collect(Collectors.toList());
    }

    // POST
    @Transactional
    public ProfessionalResponseDTO save(ProfessionalRequestDTO professionalRequestDTO) {
        Professional professional = ProfessionalMapper.toProfessional(professionalRequestDTO);
        
        Set<Area> areas = new HashSet<>(areaRepository.findAllById(professionalRequestDTO.areaIds()));
        professional.setAreas(areas);

        professional = professionalRepository.save(professional);

        return ProfessionalMapper.toProfessionalResponseDTO(professional);
    }
    
    // UPDATE BY {ID}
    @Transactional
    public ProfessionalResponseDTO update(Integer id, ProfessionalRequestDTO professionalRequestDTO) {
        try {
            Professional professional = professionalRepository.getReferenceById(id);

            ProfessionalMapper.updateProfessionalFromDTO(professionalRequestDTO, professional);

            professional.getAreas().clear();
            Set<Area> areas = new HashSet<>(areaRepository.findAllById(professionalRequestDTO.areaIds()));
            professional.setAreas(areas);
            
            professional = professionalRepository.save(professional);

            return ProfessionalMapper.toProfessionalResponseDTO(professional);

        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Professional not found with id: " + id);
        }
    }

    // DELETE BY {ID}
    public void deleteById(Integer id) {
        if (!professionalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Professional not found with id: " + id);
        }
        professionalRepository.deleteById(id);
    }
}