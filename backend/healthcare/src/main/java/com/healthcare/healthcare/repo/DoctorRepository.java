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

    @Query(value = "SELECT user_id FROM doctor WHERE doctor_id IN :doctorIds", nativeQuery = true)
    List<Long> findUserIdsByDoctorIds(@Param("doctorIds") List<Long> doctorIds);

    @Query(value = "SELECT user_id FROM doctor", nativeQuery = true)
    List<Long> findAllUserIds();

    @Query(value = "SELECT doctor_id FROM doctor WHERE user_id = :userId", nativeQuery = true)
    Long findDoctorIdByUserId(@Param(("userId")) Long userId);
}

