package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUserName(String userName);

    @Query(value = "SELECT * FROM users WHERE user_id IN :userIds", nativeQuery = true)
    List<Users> findUsersByUserIds(@Param("userIds") List<Long> userIds);
}
