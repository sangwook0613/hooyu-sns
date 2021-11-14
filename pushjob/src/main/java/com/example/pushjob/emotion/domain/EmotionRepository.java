package com.example.pushjob.emotion.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmotionRepository extends JpaRepository<Emotion, Long> {
    List<Emotion> findByContentId(Long contentPk);
    Boolean existsByUserIdAndContentIdAndContentEmoji(Long userPK, Long contentPK, String contentEmoji);
    Optional<Emotion> findByUserIdAndContentIdAndContentEmoji(Long userPk, Long contentPk, String contentEmoji);
}