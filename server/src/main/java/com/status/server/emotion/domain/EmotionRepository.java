package com.status.server.emotion.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmotionRepository extends JpaRepository<Emotion, Long> {
    List<Emotion> findByContentId(Long contentPk);
    Boolean existsByUserIdAndContentId(Long userPK, Long contentPK);
    Boolean existsByUserIdAndContentIdAndContentEmoji(Long userPK, Long contentPK, String contentEmoji);
    Optional<Emotion> findByUserIdAndContentIdAndContentEmoji(Long userPk, Long contentPk, String contentEmoji);
    void deleteAllByContentId(Long contentPK);
    void deleteAllByUserId(Long userPK);
}