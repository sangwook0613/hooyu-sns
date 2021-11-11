package com.status.server.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordTimeRepository extends JpaRepository<RecordTime, Long> {
}