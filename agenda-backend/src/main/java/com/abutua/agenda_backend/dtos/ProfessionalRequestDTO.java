package com.abutua.agenda_backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ProfessionalRequestDTO(
    @NotBlank(message = "O nome não pode ser vazio")
    @Size(min = 3, max = 150, message = "O nome deve ter entre 3 e 150 caracteres")
    String name,

    @NotBlank(message = "O Email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    String email,

    String phone,

    @NotNull(message = "O campo 'ativo' é obrigatório")
    Boolean active,

    @NotNull(message = "A lista de áreas não pode ser nula")
    List<Integer> areaIds
) {}