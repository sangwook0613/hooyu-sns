package com.status.backend.user.web;

import com.status.backend.global.domain.Token;
import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.service.ResponseGenerateService;
import com.status.backend.user.dto.GoogleLoginDto;
import com.status.backend.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
@RestController
public class LoginController {
    private final UserServiceImpl userService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/google")
    public ResponseEntity<SuccessResponseDto> loginGoogle(@RequestBody GoogleLoginDto googleLoginDto) throws Exception {
        logger.info("User LoginController 진입 loginGoogle param {}", googleLoginDto);
        Token token = userService.googleLogin(googleLoginDto.getGoogleIdToken());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse("Success!");
        HttpHeaders headers = new HttpHeaders();
        headers.add("access_token", token.getAccess_token());
        headers.add("refresh_token", token.getRefresh_token());
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(successResponseDto, headers, HttpStatus.OK);
    }
}
