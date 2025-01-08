package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.DoctorProficiency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorProficiencyRepo extends JpaRepository<DoctorProficiency, Long> {

    @Query(value = "SELECT doctor_id FROM doctor_proficiency WHERE proficiency_id IN :ids", nativeQuery = true)
    List<Long> findDoctorIdsByProficiencyIds(@Param("ids") List<Long> ids);
}

