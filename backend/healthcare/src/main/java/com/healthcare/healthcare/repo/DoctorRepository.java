package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query(value = "SELECT * FROM doctor WHERE doctor_id IN :doctorIds", nativeQuery = true)
    List<Doctor> findByProficiencyIds(@Param("doctorIds") List<Long> doctorIds);
}

