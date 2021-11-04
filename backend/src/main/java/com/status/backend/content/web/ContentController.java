package com.status.backend.content.web;

import com.status.backend.content.domain.Type;
import com.status.backend.content.dto.RequestContentDto;
import com.status.backend.content.dto.RequestSurveyAnswerDto;
import com.status.backend.content.service.ContentServiceImpl;
import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.ResponseGenerateService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/content")
@RestController
public class ContentController{

    private final ContentServiceImpl contentService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @PostMapping("/create/status")
    public ResponseEntity<SuccessResponseDto> createStatusContent(@RequestBody RequestContentDto requestContentDto) throws NoUserException {
        logger.trace("ContentController 진입  createContent param {}", requestContentDto);

        String message = contentService.createStatusContent(
                requestContentDto.getUserPK(),
                requestContentDto.getExon(),
                requestContentDto.getColor(),
                Type.STATUS
                );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/create/image")
    public ResponseEntity<SuccessResponseDto> createImageContent(@RequestBody RequestContentDto requestContentDto) throws NoUserException {
        logger.trace("ContentController 진입  createContent param {}", requestContentDto);

        String message = contentService.createImageContent(
                requestContentDto.getUserPK(),
                requestContentDto.getExon(),
                requestContentDto.getColor(),
                Type.IMAGE
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
    @PostMapping("/create/survey")
    public ResponseEntity<SuccessResponseDto> createSurveyContent(@RequestBody RequestContentDto requestContentDto, @RequestBody RequestSurveyAnswerDto requestSurveyAnswerDto) throws NoUserException {
        logger.trace("ContentController 진입  createContent param {}", requestContentDto);

        String message = contentService.createSurveyContent(
                requestContentDto.getUserPK(),
                requestContentDto.getExon(),
                requestContentDto.getColor(),
                Type.SURVEY,
                requestSurveyAnswerDto.getAnswerList()
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}