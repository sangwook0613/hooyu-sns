package com.status.backend.emotion.web;

import com.status.backend.content.domain.Type;
import com.status.backend.content.dto.RequestContentDto;
import com.status.backend.emotion.dto.EmotionDto;
import com.status.backend.emotion.dto.ResponseEmotionsDto;
import com.status.backend.emotion.service.EmotionServiceImpl;
import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.exception.NoContentException;
import com.status.backend.global.exception.NoEmotionException;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.ResponseGenerateService;
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

        String message = emotionService.toEmotion(emotionDto.getUserPK(),emotionDto.getContentPk(),emotionDto.getContentEmoji());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}
