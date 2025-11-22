package com.abutua.agenda_backend.converters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class AttributeConverterUtil {

    // This static field will hold the correct implementation (H2 or Postgre)
    public static DayOfWeekInterface dayOfWeekInterface;

    // This is a regular, Spring-managed field
    @Autowired
    private DayOfWeekInterface dayOfWeekInterfaceBean;

    @PostConstruct
    public void init() {
        // After Spring injects the bean, we assign it to the static field
        AttributeConverterUtil.dayOfWeekInterface = this.dayOfWeekInterfaceBean;
    }
}