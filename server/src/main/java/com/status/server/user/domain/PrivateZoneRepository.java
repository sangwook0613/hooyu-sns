package com.status.server.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface PrivateZoneRepository extends JpaRepository<PrivateZone, Long> {
    Boolean existsByUserId(Long userId);

    Optional<PrivateZone> findByUserId(Long userId);
    Optional<PrivateZone> findByUserIdAndTitleAndLatitudeAndLongitude(Long userPK, String title, BigDecimal lat, BigDecimal lon);
    List<PrivateZone> findAllByUserId(Long userPK);
}
