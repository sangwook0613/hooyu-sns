package com.status.server.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrivateZoneRepository extends JpaRepository<PrivateZone, Long> {
    Boolean existsByUserId(Long userId);

    Optional<PrivateZone> findByUserId(Long userId);
}
