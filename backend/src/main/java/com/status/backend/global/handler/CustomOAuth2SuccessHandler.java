package com.status.backend.global.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.status.backend.global.domain.Token;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.TokenService;
import com.status.backend.user.domain.User;
import com.status.backend.user.domain.UserRepository;
import com.status.backend.user.dto.UserRequestDto;
import com.status.backend.user.dto.UserRequestMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * OAuth2의 인증 공급자로부터 인증이 성공한 후 취득한 사용자 정보를 처리하는 핸들러
 * 이 핸들러에서 다시 JWT를 발급한다
 * @author Dawit
 *
 */

@RequiredArgsConstructor
@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;

    Logger logger = LoggerFactory.getLogger(CustomOAuth2SuccessHandler.class);


    @SneakyThrows
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserRequestDto userRequestDto = userRequestMapper.toDto(oAuth2User);

        User user = userRepository.findByEmail(userRequestDto.getEmail()).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));

        Token token = tokenService.generateToken(user.getId(), userRequestDto.getName(), "USER");
        logger.debug("성공적인 로그인 진행중 만든 token : {}", token);

        //회원 테이블에 삽입
        user.updateRefreshToken(token.getRefresh_token());
        userRepository.save(user);

        //response 에 token 정보 주입
        writeTokenResponse(response, token);

        //유저에게 돌려보네기 upload시 우리 서버로
//        String redirect_uri = "https://k5a101.p.ssafy.io/loginprocess";
//        String redirect_uri = "http://localhost:8085/loginprocess";
//        response.sendRedirect(redirect_uri);
    }

    private void writeTokenResponse(HttpServletResponse response, Token token)
            throws IOException {

        response.addHeader("access_token", token.getAccess_token());
        response.addHeader("refresh_token", token.getRefresh_token());
        response.setContentType("application/json;charset=UTF-8");

//        var writer = response.getWriter();
//        writer.println(objectMapper.writeValueAsString(token));
//        writer.flush();
    }
}