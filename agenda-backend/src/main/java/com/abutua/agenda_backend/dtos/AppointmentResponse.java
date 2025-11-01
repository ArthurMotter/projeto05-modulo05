package com.abutua.agenda_backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.abutua.agenda_backend.enums.AppointmentStatus;

/*
    {
        "id": 35,
        "date":"2023-06-26",
        "startTime": "15:30:00",
        "endTime": "16:00:00",
        "comments": "no comments",
        "status": "OPEN",
        "type":{
            "id": 1
        },
        "area":{
            "id": 1
        },
        "professional":{
            "id": 5
        },
        "client":{
            "id": 2
        }
    }
*/  

public record AppointmentResponse(
      long id,
      LocalDate date,  
      LocalTime startTime,
      LocalTime endTime,
      String comments,
      AppointmentStatus status,
      IntegerDTO type,
      IntegerDTO area,
      LongDTO professional,
      LongDTO client        
) {
    
}



