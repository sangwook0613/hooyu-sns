package com.status.server.content.web;

import com.status.server.content.domain.Type;
import com.status.server.content.dto.*;
import com.status.server.content.service.ContentServiceImpl;
import com.status.server.content.service.S3UploaderService;
import com.status.server.global.dto.SuccessResponseDto;
import com.status.server.global.exception.NoAuthorityUserException;
import com.status.server.global.exception.NoContentException;
import com.status.server.global.exception.NoUserException;
import com.status.server.global.service.ResponseGenerateService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/content")
@RestController
public class ContentController{

    private final ContentServiceImpl contentService;
    private final ResponseGenerateService responseGenerateService;
    private final S3UploaderService s3Uploader;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @PostMapping("/upload")
    public ResponseEntity<SuccessResponseDto> upload(@RequestParam("upload") MultipartFile multipartFile) throws IOException {

//        logger.debug("승현이와 함께하는 디버그 request getMethodValue : {}", request.getMethodValue());
//        logger.debug("승현이와 함께하는 디버그 ContentController in getURI : {}", request.getURI());
        logger.debug("승현이와 함께하는 디버그 ContentController in Param : {}", multipartFile);
        String imageurl = s3Uploader.upload(multipartFile, "image");

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(imageurl);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

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
    public ResponseEntity<SuccessResponseDto> createImageContent(@RequestBody RequestContentDto requestContentDto) throws NoUserException, IOException {
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
    public ResponseEntity<SuccessResponseDto> createSurveyContent(@RequestBody RequestSurveyAnswerDto requestSurveyAnswerDto) throws NoUserException {
        logger.trace("ContentController 진입  createContent param {}", requestSurveyAnswerDto);
        logger.debug("ContentController 진입  RequestSurveyAnswerDto param {}", requestSurveyAnswerDto);

        RequestContentDto requestContentDto = requestSurveyAnswerDto.getRequestContentDto();
        String message = contentService.createSurveyContent(
                requestContentDto.getUserPK(),
                requestContentDto.getExon(),
                requestContentDto.getColor(),
                Type.SURVEY,
                requestSurveyAnswerDto.getAnswerList()
        );
        logger.debug("설문조사 등록 완료 메시지 : {}",message);
        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/vote/survey")
    public ResponseEntity<SuccessResponseDto> voteSurvey(@RequestBody VoteSurveyDto voteSurveyDto) throws NoUserException, NoContentException {
        logger.trace("ContentController 진입  vote param {}", voteSurveyDto);

        String message = contentService.voteSurvey(
                voteSurveyDto.getUserPK(),
                voteSurveyDto.getContentPK(),
                voteSurveyDto.getAnswerPK()
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/vote/check")
    public ResponseEntity<SuccessResponseDto> voteSurvey(@RequestBody VotedDto votedDto) throws NoUserException, NoContentException {

        logger.debug("vote Controller 들어왔어요");
        String message = contentService.votedSurvey(votedDto.getUserPK(), votedDto.getContentPK());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        logger.debug("vote 결과 message : {}", message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/report")
    public ResponseEntity<SuccessResponseDto> reportContent(@RequestBody RequestReportDto requestReportDto) throws NoUserException, NoContentException {

        String message = contentService.reportContent(requestReportDto.getUserPK(),requestReportDto.getContentPK(),requestReportDto.getReason());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/status/{userName}")
    public ResponseEntity<SuccessResponseDto> getStatusContent(@PathVariable String userName) throws NoUserException, NoContentException {

        List<ResponseContentDto> list = contentService.statusContent(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/image/{userName}")
    public ResponseEntity<SuccessResponseDto> getImageContent(@PathVariable String userName) throws NoUserException, NoContentException {

        List<ResponseContentDto> list = contentService.imageContent(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/survey/{userName}")
    public ResponseEntity<SuccessResponseDto> getSurveyContent(@PathVariable String userName) throws NoUserException, NoContentException {

        List<ResponseSurveyDto> list = contentService.surveyContent(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/status")
    public ResponseEntity<SuccessResponseDto> deleteStatusContent(@RequestBody RequestDeleteContentDto requestDeleteContentDto) throws NoContentException, NoUserException, NoAuthorityUserException {
        logger.trace("ContentController 진입  createContent param {}", requestDeleteContentDto);

        String message = contentService.deleteContent(
                requestDeleteContentDto.getUserPK(),
                requestDeleteContentDto.getContentPK(),
                Type.STATUS
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/image")
    public ResponseEntity<SuccessResponseDto> deleteImageContent(@RequestBody RequestDeleteContentDto requestDeleteContentDto) throws NoContentException, NoUserException, NoAuthorityUserException {
        logger.trace("ContentController 진입  createContent param {}", requestDeleteContentDto);

        String message = contentService.deleteContent(
                requestDeleteContentDto.getUserPK(),
                requestDeleteContentDto.getContentPK(),
                Type.IMAGE
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/survey")
    public ResponseEntity<SuccessResponseDto> deleteSurveyContent(@RequestBody RequestDeleteContentDto requestDeleteContentDto) throws NoContentException, NoUserException, NoAuthorityUserException {
        logger.trace("ContentController 진입  createContent param {}", requestDeleteContentDto);

        String message = contentService.deleteContent(
                requestDeleteContentDto.getUserPK(),
                requestDeleteContentDto.getContentPK(),
                Type.SURVEY
        );

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}