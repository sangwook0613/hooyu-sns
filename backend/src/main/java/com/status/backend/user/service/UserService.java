package com.status.backend.user.service;

import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.exception.duplicateNameException;
import com.status.backend.user.domain.User;
import com.status.backend.user.dto.ResponseUserLocationDto;
import com.status.backend.user.dto.UserResponseDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface UserService {

    UserResponseDto getUserInfo(Long userPK) throws NoUserException;

    String duplicateCheckName(String userName) throws NoUserException;
    String changeName(Long userPK, String userName) throws NoUserException, duplicateNameException;

    String changeEmoji(Long userPK, String userEmoji) throws NoUserException;

    String setUpPrivateZone(Long userPK, BigDecimal lat, BigDecimal lon) throws NoUserException;

    String setPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException;
    String setPushAlarmSync(Long userPK, Boolean sync) throws NoUserException;
    String setPushAlarmRadius(Long userPK, int radius) throws NoUserException;

    List<ResponseUserLocationDto> getUserWithinRadius(User user, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException;
    List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException;

}