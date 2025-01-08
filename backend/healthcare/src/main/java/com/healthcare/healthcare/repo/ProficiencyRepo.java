package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Proficiency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProficiencyRepo extends JpaRepository<Proficiency, Long> {

    @Query(value = "SELECT * FROM proficiency WHERE proficiency_name IN :proficiencies", nativeQuery = true)
    List<Proficiency> findByProficiencyNameIn(@Param("proficiencies") List<String> proficiencies);
}

