package com.abutua.agenda_backend.repositories;

import com.abutua.agenda_backend.models.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    /**
     * Finds clients whose names contain the given string, ignoring case.
     * The search is paginated according to the Pageable parameter.
     *
     * @param name The string to search for within client names.
     * @param pageable The pagination information.
     * @return A Page of Clients matching the criteria.
     */
    Page<Client> findByNameContainingIgnoreCase(String name, Pageable pageable);
}