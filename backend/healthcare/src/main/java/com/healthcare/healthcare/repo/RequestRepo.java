package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepo extends JpaRepository<Request, Long> {

    @Query(value = "SELECT * FROM request WHERE doctor_id = :doctorId", nativeQuery = true)
    List<Request> findByDoctorID(@Param("doctorId") Long doctorId);

    @Query(value = "SELECT * FROM request WHERE id IN :requestIds", nativeQuery = true)
    List<Request> findAllById(@Param("requestIds") List<Long> requestIds);
}

