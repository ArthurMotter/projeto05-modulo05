package com.abutua.agenda_backend.services.exceptions;

public class ParameterException extends RuntimeException {
    public ParameterException(String msg) {
        super(msg);
    }
}