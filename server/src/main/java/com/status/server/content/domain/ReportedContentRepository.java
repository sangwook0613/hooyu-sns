package com.status.server.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportedContentRepository extends JpaRepository<ReportedContent, Long> {
    void deleteAllByUserId(Long userPK);
    void deleteAllByContentId(Long contentPK);
}