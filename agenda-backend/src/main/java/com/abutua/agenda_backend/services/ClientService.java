package com.abutua.agenda_backend.services;

import com.abutua.agenda_backend.dtos.ClientRequestDTO;
import com.abutua.agenda_backend.dtos.ClientResponseDTO;
import com.abutua.agenda_backend.models.Client;
import com.abutua.agenda_backend.repositories.ClientRepository;
import com.abutua.agenda_backend.services.exceptions.ResourceNotFoundException;
import com.abutua.agenda_backend.services.mappers.ClientMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    // GET BY {name} with Pagination
    @Transactional(readOnly = true)
    public Page<ClientResponseDTO> getAll(String name, Pageable pageable) {
        Page<Client> clientsPage;

        if (name != null && !name.isBlank()) {
            clientsPage = clientRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            clientsPage = clientRepository.findAll(pageable);
        }

        return clientsPage.map(ClientMapper::toClientResponseDTO);
    }

    // GET BY {ID}
    @Transactional(readOnly = true)
    public ClientResponseDTO getById(Integer id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));

        return ClientMapper.toClientResponseDTO(client);
    }

    // POST
    @Transactional
    public ClientResponseDTO save(ClientRequestDTO clientRequestDTO) {
        Client client = ClientMapper.toClient(clientRequestDTO);
        client = clientRepository.save(client);
        return ClientMapper.toClientResponseDTO(client);
    }
    
    // UPDATE BY {ID}
    @Transactional
    public ClientResponseDTO update(Integer id, ClientRequestDTO clientRequestDTO) {
        try {
            Client client = clientRepository.getReferenceById(id);
            ClientMapper.updateClientFromDTO(clientRequestDTO, client);
            client = clientRepository.save(client);
            return ClientMapper.toClientResponseDTO(client);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Client not found with id: " + id);
        }
    }

    // DELETE BY {ID}
    public void deleteById(Integer id) {
        if (!clientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Client not found with id: " + id);
        }
        clientRepository.deleteById(id);
    }
}