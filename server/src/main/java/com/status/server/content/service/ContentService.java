package com.status.server.content.service;

import com.status.server.content.domain.Type;
import com.status.server.content.dto.ResponseContentDto;
import com.status.server.content.dto.ResponseSurveyDto;
import com.status.server.global.exception.NoAuthorityUserException;
import com.status.server.global.exception.NoContentException;
import com.status.server.global.exception.NoUserException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface ContentService {
    String createStatusContent(Long userPK, String exon, String color, Type type) throws NoUserException;
    String createImageContent(Long userPK, String exon, String color, Type type) throws NoUserException, IOException;
    String createSurveyContent(Long userPK, String exon, String color, Type type, List<String> answerList) throws NoUserException;

    //투표
    String voteSurvey(Long userPK, Long contentPK, Long answerPK) throws NoUserException, NoContentException;

    //투표 여부
    String votedSurvey(Long userPK, Long contentPK) throws NoUserException, NoContentException;

    // 가져오기
    List<ResponseContentDto> statusContent(String userName) throws NoUserException, NoContentException;
    List<ResponseContentDto> imageContent(String userName) throws NoUserException, NoContentException;
    List<ResponseSurveyDto> surveyContent(String userName) throws NoUserException, NoContentException;

 // 가져오기2
//    List<ResponseContentPlusDto> statusesContent(String userName) throws NoUserException, NoContentException;
//    List<ResponseContentPlusDto> imagesContent(String userName) throws NoUserException, NoContentException;
//    List<ResponseSurveyPlusDto> surveysContent(String userName) throws NoUserException, NoContentException;

    //삭제
    String deleteContent(Long userPK, Long contentPK) throws NoContentException, NoUserException, NoAuthorityUserException;

    //신고
    String reportContent(Long userPK, Long contentPK, String reason) throws NoContentException, NoUserException;

}
