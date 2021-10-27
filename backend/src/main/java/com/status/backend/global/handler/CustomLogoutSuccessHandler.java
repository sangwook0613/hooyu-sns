package com.status.backend.global.handler;

import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.TokenService;
import com.status.backend.user.domain.User;
import com.status.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class CustomLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {
    private final TokenService tokenService;
    private final UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(CustomLogoutSuccessHandler.class);

    @SneakyThrows
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String access_token = request.getHeader("access_token");
        String refresh_token = request.getHeader("refresh_token");
        logger.trace("request.getHeaderNames : {}",request.getHeaderNames());
        logger.trace("?>>>>>>>>>>>>로그아웃 access_token: {}",access_token);

        if(refresh_token != null && tokenService.verifyToken(refresh_token)){

        }else if (access_token != null && tokenService.verifyToken(access_token)) {
            Long id = tokenService.getId(access_token);

            User user = userRepository.findById(id).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
            user.updateRefreshToken("");
            userRepository.save(user);
            logger.trace("{}님의 refresh 초기화 했습니다.",tokenService.getNickName(access_token));

        } else {
            logger.trace("로그아웃 처리 실패!! 사실상 여기 오기 불가능...");
            //JWT요청이 잘못옴
            throw new IllegalArgumentException("JWT 토큰이 잘못되었습니다.");
        }
    }
}