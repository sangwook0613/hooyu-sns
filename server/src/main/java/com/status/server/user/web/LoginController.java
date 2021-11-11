package com.status.server.user.web;

import com.status.server.global.domain.Token;
import com.status.server.global.dto.SuccessResponseDto;
import com.status.server.global.service.ResponseGenerateService;
import com.status.server.global.service.TokenService;
import com.status.server.user.dto.GoogleLoginDto;
import com.status.server.user.dto.UserResponseDto;
import com.status.server.user.service.UserServiceImpl;
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
    private final TokenService tokenService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/google")
    public ResponseEntity<SuccessResponseDto> loginGoogle(@RequestBody GoogleLoginDto googleLoginDto) throws Exception {
        logger.info("User LoginController 진입 loginGoogle param {}", googleLoginDto);
        Token token = userService.googleLogin(googleLoginDto.getGoogleIdToken());

        UserResponseDto userResponseDto = userService.getUserInfo(tokenService.getId(token.getAccess_token()));
        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(userResponseDto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("access_token", token.getAccess_token());
        headers.add("refresh_token", token.getRefresh_token());
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(successResponseDto, headers, HttpStatus.OK);
    }
}
