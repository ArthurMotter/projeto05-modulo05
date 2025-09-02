package com.abutua.agenda_backend.services;

import com.abutua.agenda_backend.dtos.AreaDTO;

import com.abutua.agenda_backend.repositories.AreaRepository;
import com.abutua.agenda_backend.services.mappers.AreaMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AreaService {

    private final AreaRepository areaRepository;

    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    @Transactional(readOnly = true)
    public List<AreaDTO> findAll() {
        return areaRepository.findAll()
                .stream()
                .map(AreaMapper::toDTO)
                .collect(Collectors.toList());
    }
}