package com.status.server.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyContentAnswerRepository extends JpaRepository<SurveyContentAnswer, Long> {
    Boolean existsByUserIdAndContentId(Long userPK, Long contentPK);
    List<SurveyContentAnswer> findByUserIdAndContentId(Long userPk, Long contentPk);
    List<SurveyContentAnswer> findByContentId(Long contentPk);
    Optional<SurveyContentAnswer> findById(Long answerPK);

    void deleteByContentId(Long contentPK);
    void deleteAllByUserId(Long userPK);
}
