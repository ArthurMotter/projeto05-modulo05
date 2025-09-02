package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.ClientRequestDTO;
import com.abutua.agenda_backend.dtos.ClientResponseDTO;
import com.abutua.agenda_backend.models.Client;

public class ClientMapper {

    public static ClientResponseDTO toClientResponseDTO(Client client) {
        return new ClientResponseDTO(
            client.getId(),
            client.getName(),
            client.getPhone(),
            client.getDateOfBirth(),
            client.getComments()
        );
    }

    public static Client toClient(ClientRequestDTO dto) {
        Client client = new Client();
        client.setName(dto.name());
        client.setPhone(dto.phone());
        client.setDateOfBirth(dto.dateOfBirth());
        client.setComments(dto.comments());
        return client;
    }

    public static void updateClientFromDTO(ClientRequestDTO dto, Client client) {
        client.setName(dto.name());
        client.setPhone(dto.phone());
        client.setDateOfBirth(dto.dateOfBirth());
        client.setComments(dto.comments());
    }
}