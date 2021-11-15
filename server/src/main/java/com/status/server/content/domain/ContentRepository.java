package com.status.server.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByTypeAndUserIdOrderByCreatedAtDesc(Type type,Long userPK);
    Optional<Content> findByUserIdAndIdAndType(Long userPK, Long contentPK, Type type);
    Optional<Content> findByUserIdAndId(Long userPK, Long contentPK);
    List<Content> findAllByUserId(Long userPK);
    void deleteByUserId(Long userPK);
}