package com.abutua.agenda_backend.repositories;

import com.abutua.agenda_backend.models.Professional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Integer> {

    Page<Professional> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT COUNT(p) > 0 FROM Professional p JOIN p.areas a WHERE p.id = :professionalId AND a.id = :areaId")
    boolean existsAssocioationWithArea(Integer professionalId, Integer areaId);
    
    Page<Professional> findByAreas_IdAndActiveTrue(Integer areaId, Pageable pageable);
}