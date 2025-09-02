package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.ClientRequestDTO;
import com.abutua.agenda_backend.dtos.ClientResponseDTO;
import com.abutua.agenda_backend.services.ClientService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // GET BY {name}
    @GetMapping
    public ResponseEntity<Page<ClientResponseDTO>> getAllClients(
            @RequestParam(defaultValue = "") String name,
            @PageableDefault(page = 0, size = 10, sort = "name") Pageable pageable) {

        Page<ClientResponseDTO> clients = clientService.getAll(name, pageable);
        return ResponseEntity.ok(clients);
    }

    // GET BY {ID}
    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> getClientById(@PathVariable Integer id) {
        ClientResponseDTO client = clientService.getById(id);
        return ResponseEntity.ok(client);
    }

    // POST
    @PostMapping
    public ResponseEntity<ClientResponseDTO> createClient(@Valid @RequestBody ClientRequestDTO clientRequestDTO) {
        ClientResponseDTO newClient = clientService.save(clientRequestDTO);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newClient.id())
                .toUri();

        return ResponseEntity.created(location).body(newClient);
    }

    // UPDATE BY {ID}
    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> updateClient(@PathVariable Integer id, @Valid @RequestBody ClientRequestDTO clientRequestDTO) {
        ClientResponseDTO updatedClient = clientService.update(id, clientRequestDTO);
        return ResponseEntity.ok(updatedClient);
    }
    
    // DELETE BY {ID}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}