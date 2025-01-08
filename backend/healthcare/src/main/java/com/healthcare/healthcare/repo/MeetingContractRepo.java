package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.MeetingContracts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingContractRepo extends JpaRepository<MeetingContracts, Long> {
    Optional<MeetingContracts> findByRequestId(Long requestId);
}
