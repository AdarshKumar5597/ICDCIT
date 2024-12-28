package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Proficiency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProficiencyRepository extends JpaRepository<Proficiency, Long> {
    Optional<Proficiency> findByProficiencyName(String proficiencyName);
}
