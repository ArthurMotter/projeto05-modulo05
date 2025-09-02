package com.abutua.agenda_backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record ClientRequestDTO(
    @NotBlank(message = "O nome não pode ser vazio")
    @Size(min = 3, max = 150, message = "O nome deve ter entre 3 e 150 caracteres")
    String name,

    String phone,

    @NotNull(message = "A data de nascimento não pode ser nula")
    @Past(message = "A data de nascimento deve ser no passado")
    LocalDate dateOfBirth,

    String comments
) {}