package com.status.server.user.service;

import com.status.server.global.domain.Token;
import com.status.server.global.exception.DuplicateNameException;
import com.status.server.global.exception.NoBrowserTokenException;
import com.status.server.global.exception.NoTargetException;
import com.status.server.global.exception.NoUserException;
import com.status.server.user.domain.User;
import com.status.server.user.dto.ResponseUserLocationDto;
import com.status.server.user.dto.UserResponseDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Service
public interface UserService {

    Token googleLogin(String googleIdToken) throws Exception;
    String killApp(Long userPK) throws NoUserException;
    String aliveApp(Long userPK) throws NoUserException;

    UserResponseDto getUserInfo(Long userPK) throws NoUserException;

    String duplicateCheckName(String userName) throws NoUserException;
    String changeName(Long userPK, String userName) throws NoUserException, DuplicateNameException;

    String changeEmoji(Long userPK, String userEmoji) throws NoUserException;

    String setUpPrivateZone(Long userPK, String title, BigDecimal lat, BigDecimal lon) throws NoUserException;
    String deletePrivateZone(Long userPK, String title, BigDecimal lat, BigDecimal lon) throws NoTargetException;

    String setPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException;
    String setPushAlarmSync(Long userPK, Boolean sync) throws NoUserException;
    String setPushAlarmRadius(Long userPK, int radius) throws NoUserException;

    List<ResponseUserLocationDto> getUserWithinRadius(User user, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException;
    List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException, NoBrowserTokenException, IOException;

}
