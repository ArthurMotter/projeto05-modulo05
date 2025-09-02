package com.abutua.agenda_backend.repositories;

import com.abutua.agenda_backend.models.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer> {

}