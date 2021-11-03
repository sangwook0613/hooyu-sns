package com.status.backend.user.service;

import com.status.backend.global.exception.NoUserException;
import com.status.backend.user.dto.ResponseUserLocationDto;
import com.status.backend.user.dto.UserMapping;
import com.status.backend.user.dto.UserResponseDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface UserService {

    UserResponseDto getUserInfo(Long userPK) throws NoUserException;

    String DuplicateCheckName(String userName) throws NoUserException;
    String ChangeName(String userName) throws NoUserException;

    String ChangeEmoji(Long userPK, String userEmoji) throws NoUserException;

    String SetUpPrivateZone(Long userPK, BigDecimal lat, BigDecimal lon) throws NoUserException;

    String SetPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException;
    String SetPushAlarmSync(Long userPK, Boolean sync) throws NoUserException;
    String SetPushAlarmRadius(Long userPK, int radius) throws NoUserException;

    List<UserMapping> getUserWithinRadius(Long userPK, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException;
    List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException;

}
