package com.status.backend.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    boolean existsByName(String name);
    boolean existsByIdAndAliveTrue(Long userPK);
    boolean existsByIdAndAliveFalse(Long userPK);
}
