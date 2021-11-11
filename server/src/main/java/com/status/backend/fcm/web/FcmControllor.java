package com.status.backend.fcm.web;

import com.status.backend.fcm.dto.RequestFCMDto;
import com.status.backend.fcm.service.FcmService;
import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.exception.NoBrowserTokenException;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.ResponseGenerateService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/browser")
@RestController
public class FcmControllor {

    private final ResponseGenerateService responseGenerateService;
    private final FcmService fcmService;

    Logger logger = LoggerFactory.getLogger(FcmControllor.class);

    //InToken
    @PostMapping("/in")
    public ResponseEntity<SuccessResponseDto> inToken (@RequestBody RequestFCMDto requestFCMDto) throws NoBrowserTokenException, NoUserException {
        String message = "";
        if(requestFCMDto.getBrowserToken() == null || requestFCMDto.getBrowserToken().equals("")){
            throw new NoBrowserTokenException("브라우저토큰이 null입니다....");
        }else{
            message = fcmService.setBrowserToken(requestFCMDto.getUserPK(),requestFCMDto.getBrowserToken());
        }
        logger.trace("브라우저토큰"+message);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    //OutToken
    @PostMapping("/out")
    public ResponseEntity<SuccessResponseDto> outToken (@RequestBody RequestFCMDto requestFCMDto) throws Exception {
        String message = "";
        message = fcmService.deleteBrowserToken(requestFCMDto.getUserPK());
        logger.trace("브라우저토큰"+message);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

}
