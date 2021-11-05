package com.status.backend.fcm.web;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/push")
@RestController
public class FcmControllor {

    private final ResponseGenerateService responseGenerateService;
    private final FcmService fcmService;

    Logger logger = LoggerFactory.getLogger(FcmControllor.class);

    @GetMapping("/{userPK}")
    public ResponseEntity<SuccessResponseDto> setToken (@PathVariable("userPK") Long userPK, ServletRequest request, ServletResponse response) throws NoBrowserTokenException, NoUserException {
        String message = "";

        String browser_token = ((HttpServletRequest)request).getHeader("browser_token");
        logger.trace("브라우저토큰 왔음 {} ",browser_token);
        HttpStatus status;
        if(browser_token != null){
            message = fcmService.setBrowserToken(userPK,browser_token);
            status = HttpStatus.OK;
        }else{
            throw new NoBrowserTokenException("브라우저토큰이 null입니다....");
        }
        logger.trace("브라우저토큰"+message);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
        return new ResponseEntity<>(successResponseDto, status);
    }
}
