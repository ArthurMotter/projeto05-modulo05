package com.abutua.agenda_backend.repositories;

import com.abutua.agenda_backend.models.Professional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Integer> {

    /**
     * Finds professionals whose names contain the given string, ignoring case.
     * The search is paginated according to the Pageable parameter.
     *
     * @param name The string to search for within professional names.
     * @param pageable The pagination information.
     * @return A Page of Professionals matching the criteria.
     */
    Page<Professional> findByNameContainingIgnoreCase(String name, Pageable pageable);
}