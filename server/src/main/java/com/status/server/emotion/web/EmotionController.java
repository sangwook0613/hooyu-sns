package com.status.server.emotion.web;

import com.status.server.emotion.dto.EmotionDto;
import com.status.server.emotion.service.EmotionServiceImpl;
import com.status.server.global.dto.SuccessResponseDto;
import com.status.server.global.exception.NoContentException;
import com.status.server.global.exception.NoEmotionException;
import com.status.server.global.exception.NoUserException;
import com.status.server.global.service.ResponseGenerateService;
import com.status.server.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/emotion")
@RestController
public class EmotionController {

    private final EmotionServiceImpl emotionService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(EmotionController.class);

    @GetMapping("/{contentPK}")
    public ResponseEntity<SuccessResponseDto> getEmotions(@PathVariable Long contentPK) throws NoContentException {
        logger.trace("EmotionController 진입  getEmotions param {}", contentPK);

        List<EmotionDto> emotions = emotionService.getEmotions(contentPK);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(emotions);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/empathize")
    public ResponseEntity<SuccessResponseDto> getEmotions(@RequestBody EmotionDto emotionDto) throws NoContentException, NoEmotionException, NoUserException {
        logger.trace("EmotionController 진입  getEmotions param {}", emotionDto);

        String message = emotionService.toEmotion(SecurityUtil.getCurrentUserId(),emotionDto.getContentPk(),emotionDto.getContentEmoji());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}
