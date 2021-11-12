package com.example.pushjob.fcm.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
    List<FcmToken> findAllByUserIdIn(List<Long> userPK);
    List<FcmToken> findFcmTokenByUserId(Long userId);

    List<FcmToken> findAllByPushThreeLessThanEqual(LocalDateTime nowTime);
}
