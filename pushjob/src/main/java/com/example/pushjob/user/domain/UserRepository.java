package com.example.pushjob.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    boolean existsByName(String name);
    List<User> findByRecordTimeIdIn(List<Long> recordTimeList);

    List<User> findAllByRecordTimeRecentAtLessThanEqual(LocalDateTime time);
}
