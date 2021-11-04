package com.status.backend.content.web;

import com.status.backend.content.dto.RequestContentDto;
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

//    private final UserServiceImpl userService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @PostMapping("/create")
    public ResponseEntity<SuccessResponseDto> createContent(@RequestBody RequestContentDto requestContentDto) throws NoUserException {
        logger.trace("ContentController 진입  createContent param {}", requestContentDto);
        String message = "";

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}