package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.DoctorProficiency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorProficiencyRepository extends JpaRepository<DoctorProficiency, Long> {
}
