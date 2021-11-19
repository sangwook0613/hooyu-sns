package com.status.server.fcm.web;

import com.status.server.fcm.dto.RequestFCMDto;
import com.status.server.fcm.service.FcmService;
import com.status.server.global.dto.SuccessResponseDto;
import com.status.server.global.exception.NoBrowserTokenException;
import com.status.server.global.exception.NoUserException;
import com.status.server.global.service.ResponseGenerateService;
import com.status.server.global.util.SecurityUtil;
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
        logger.debug("inToken gogo 들어왔어요 browser: {}", requestFCMDto.toString());
        logger.debug("inToken gogo 들어왔어요 browser: {}", requestFCMDto.getBrowserToken());
        if(requestFCMDto.getBrowserToken() == null || requestFCMDto.getBrowserToken().equals("")){
            throw new NoBrowserTokenException("브라우저토큰이 null입니다....");
        }else{
            message = fcmService.setBrowserToken(SecurityUtil.getCurrentUserId(),requestFCMDto.getBrowserToken());
        }
        logger.trace("브라우저토큰"+message);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    //OutToken
    @PostMapping("/out")
    public ResponseEntity<SuccessResponseDto> outToken (@RequestBody RequestFCMDto requestFCMDto) throws Exception {
        String message = "";
        message = fcmService.deleteBrowserToken(SecurityUtil.getCurrentUserId());
        logger.trace("브라우저토큰"+message);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

}
