package com.abutua.agenda_backend.models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.HashSet;
import java.util.Set;

public class ProfessionalTest {

    @Test
    void testSettersAndGetters() {
        // Arrange
        Professional professional = new Professional();
        Set<Area> areas = new HashSet<>();
        areas.add(new Area(1, "Cabelo"));

        // Act
        professional.setId(1);
        professional.setName("Ana Silva");
        professional.setEmail("ana.silva@example.com");
        professional.setPhone("11999998888");
        professional.setActive(true);
        professional.setAreas(areas);

        // Assert
        assertEquals(1, professional.getId());
        assertEquals("Ana Silva", professional.getName());
        assertEquals("ana.silva@example.com", professional.getEmail());
        assertEquals("11999998888", professional.getPhone());
        assertTrue(professional.isActive());
        assertEquals(1, professional.getAreas().size());
        assertTrue(professional.getAreas().contains(new Area(1, "Cabelo")));
    }

    @Test
    void testAllArgsConstructor() {
        // Arrange
        Set<Area> areas = new HashSet<>();
        areas.add(new Area(2, "Manicure"));
        
        // Act
        Professional professional = new Professional(2, "Bruno Costa", "bruno.costa@example.com", "21888887777", false, areas);

        // Assert
        assertEquals(2, professional.getId());
        assertEquals("Bruno Costa", professional.getName());
        assertEquals("bruno.costa@example.com", professional.getEmail());
        assertEquals("21888887777", professional.getPhone());
        assertFalse(professional.isActive());
        assertEquals(1, professional.getAreas().size());
    }

    @Test
    void testDefaultValues() {
        // Arrange & Act
        Professional professional = new Professional();

        // Assert
        assertNull(professional.getId(), "ID should be null by default");
        assertNull(professional.getName(), "Name should be null by default");
        assertTrue(professional.isActive(), "Active should be true by default");
        assertNotNull(professional.getAreas(), "Areas set should not be null by default");
        assertTrue(professional.getAreas().isEmpty(), "Areas set should be empty by default");
    }
}