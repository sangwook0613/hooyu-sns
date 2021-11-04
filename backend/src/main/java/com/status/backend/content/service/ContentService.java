package com.status.backend.content.service;

import com.status.backend.content.domain.Type;
import com.status.backend.content.dto.ResponseContentDto;
import com.status.backend.content.dto.ResponseSurveyDto;
import com.status.backend.global.exception.NoContentException;
import com.status.backend.global.exception.NoUserException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContentService {
    String createStatusContent(Long userPK, String exon, String color, Type type) throws NoUserException;
    String createImageContent(Long userPK, String exon, String color, Type type) throws NoUserException;
    String createSurveyContent(Long userPK, String exon, String color, Type type, List<String> answerList) throws NoUserException;

    //투표
    String voteSurvey(Long userPK, Long contentPK, Long answerPK) throws NoUserException, NoContentException;

    //투표 여부
    String votedSurvey(Long userPK, Long contentPK) throws NoUserException, NoContentException;

    // 가져오기
    List<ResponseContentDto> statusContent(String userName) throws NoUserException, NoContentException;
    List<ResponseContentDto> imageContent(String userName) throws NoUserException, NoContentException;
    List<ResponseSurveyDto> surveyContent(String userName) throws NoUserException, NoContentException;

    //삭제

}
