package com.status.backend.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordTimeRepository extends JpaRepository<RecordTime, Long> {
}