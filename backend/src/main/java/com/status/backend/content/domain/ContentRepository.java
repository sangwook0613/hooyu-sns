package com.status.backend.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByTypeAndUserIdOrderByCreatedAtDesc(Type type,Long userPK);
    Optional<Content> findByUserIdAndIdAndType(Long userPK, Long contentPK, Type type);
}