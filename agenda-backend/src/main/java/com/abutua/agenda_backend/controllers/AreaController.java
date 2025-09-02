package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.services.AreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("areas")
@CrossOrigin
public class AreaController {

    private final AreaService areaService;

    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @GetMapping
    public ResponseEntity<List<AreaDTO>> findAll() {
        List<AreaDTO> areas = areaService.findAll();
        return ResponseEntity.ok(areas);
    }
}